import List from "./List";
import useFetchById from "./useFetchById";
import Friend from "./pages/connections/Friend";
import { useEffect, useState } from "react";

const Search = (props) => {
    const [filteredUsersNumber, setFilteredUsersNumber] = useState("");
    const {data: user,
        loadingMessage,
        errorMessage} = useFetchById(
        `https://karkade-development-default-rtdb.firebaseio.com/users.json`
      );

      const filterSearch = (users, searchValue)=>{
        const searchValueArray = searchValue.split(" ");
        return users.filter((user)=>{
            for(let i = 0; i<searchValueArray.length ;i++){
                if(user.username.includes(searchValueArray[i])){
                    return user.username.includes(searchValueArray[i])
                }
            }
            return false;
        })
      }
      useEffect(()=>{
        setFilteredUsersNumber(filterSearch(Object.values(user?user:""), props.searchValue));
      },[props.searchValue, user])
    return ( <div className="home">
        {loadingMessage && <div>Loading...</div>}
        {user && 
            <List>
                {filteredUsersNumber.map((user)=>{
                    return <Friend user={user.userId} key={user.userId}/>
                })}
                <p className="connections-title">{filteredUsersNumber.length} User{filteredUsersNumber.length>1?"s":""}</p>
            </List>
        }
        {errorMessage && <div>{errorMessage}</div>}
</div> );
}
 
export default Search;