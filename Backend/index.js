// app.js

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set destination folder for uploaded files
const { protect } = require('./middleware/auth');
const User = require('./models/User');
const Story = require('./models/Story');
const Comment = require('./models/Comment');
const { registrationSchema, loginSchema } = require('./schemas/userSchema');
// const { storySchema } = require('./schemas/storySchema');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log(error);
    process.exit(1);
});

const port = 3000;

// User Registration
app.post('/register', async (req, res) => {
    try {
        // Validate the request body
        const { error } = registrationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Check if a user with the given email already exists
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Check if a user with the given username already exists
        const usernameExists = await User.findOne({ username: req.body.username });
        if (usernameExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user object and save it to the database
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            profilePic: req.body.profilePic
        });

        // Save the user to the database
        await user.save();

        // Create a JWT and send it in a cookie
        const token = jwt.sign({ userId: user._id }, 'secret');
        res.cookie('token', token, { httpOnly: true });

        // Send the user object in the response
        res.status(201).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// User Login
app.post('/login', async (req, res) => {
    try {
        // Validate the request body
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Check if a user with the given email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create a JWT and send it in a cookie
        const token = jwt.sign({ userId: user._id }, 'secret');
        res.cookie('token', token, { httpOnly: true });

        // Send the user object in the response
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// User Logout
app.get('/logout', protect, (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
});

// Get User Details
app.get('/user', protect, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User.findById(req.userId).select('-password');
        const stories = await Story.find({ user: req.userId }).populate('user', '-password');
        res.status(200).json({ user, stories });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Create a Story
app.post('/stories', upload.single('file'), protect, async (req, res) => {
    const { title, content, isPublic } = req.body;
    const { filename } = req.file;

    try {
        // Create a new story
        const newStory = new Story({
            title,
            content,
            isPublic,
            fileUrl: `/uploads/${filename}`,
            user: req.user._id // Set the user ID to the currently logged-in user
        });
        const savedStory = await newStory.save();

        res.json(savedStory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Get All Stories
app.get('/stories', protect, async (req, res) => {
    try {
        // Find all public stories
        const publicStories = await Story.find({ isPublic: true }).populate('user', '-password');

        res.json(publicStories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a specific story by ID
app.get('/stories/:id', protect, async (req, res) => {
    const { id } = req.params;

    try {
        // Find the story by ID
        const story = await Story.findById(id).populate('user', '-password');
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        // If the story is private, check if the user is authorized to view it
        if (!story.isPublic && !story.user.equals(req.user._id)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        res.json(story);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Edit a story
app.put('/stories/:id', protect, async (req, res) => {
    const { id } = req.params;
    const { title, content, isPublic } = req.body;

    try {
        // Check if the story exists
        const story = await Story.findById(id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        // Update the story
        story.title = title;
        story.content = content;
        story.isPublic = isPublic;
        const updatedStory = await story.save();

        res.json(updatedStory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



// Delete a story
app.delete('/stories/:id', protect, async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the story exists
        const story = await Story.findById(id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        // Delete the story
        await story.remove();

        res.json({ message: 'Story deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/stories/:id/public
app.put('/stories/:id/public', protect, async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);

        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        story.isPublic = true;
        await story.save();

        res.json(story);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Upvote a Story
app.put('/stories/:id/upvote', protect, async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        if (story.upvotes.includes(req.user._id)) {
            return res.status(400).json({ message: 'You have already upvoted this story' });
        }

        story.upvotes.push(req.user._id);
        await story.save();

        res.status(200).json({ message: 'Upvoted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add a comment to a story
app.post('/stories/:storyId/comments', protect, async (req, res) => {
    try {
        const comment = new Comment({
            user: req.user._id,
            story: req.params.storyId,
            body: req.body.body
        });
        await comment.save();
        res.status(201).send(comment);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Get all comments for a story
app.get('/story/:id/comments', protect, async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        const comments = await Comment.find({ story: story._id });
        return res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// delete a comment
app.delete('/comments/:id', protect, (req, res) => {
    const { id } = req.params;

    Comment.findByIdAndDelete(id, (err, comment) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting comment');
        } else if (!comment) {
            res.status(404).send('Comment not found');
        } else {
            res.send(comment);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
