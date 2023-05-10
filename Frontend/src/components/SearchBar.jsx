import { useState } from "react"
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react"
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from "react-router-dom"


const SearchBar = () => {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${search}`)
    }
    return (
        <form onSubmit={handleSubmit}>
            <InputGroup w={500} my={4} >
                <InputLeftElement pointerEvents="none">
                    <AiOutlineSearch />
                </InputLeftElement>
                <Input bg={"#e2e2e2"} type="text" placeholder="Search for stories, friends and more..." onChange={handleSearch} value={search} />
            </InputGroup>
        </form>
    )
}

export default SearchBar