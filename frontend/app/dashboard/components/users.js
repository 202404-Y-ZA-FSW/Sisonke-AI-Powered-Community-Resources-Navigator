import {useState,useEffect, React} from 'react';
import axios from 'axios';

  export default function UserManagement(){
    
    const [errors, setErrors] = useState({});
    const [users, setUser] = useState({username:"",name:"", email:"",status:"Active", role:"User"});

    const fetchUsers = async()=>{
        try{
            const response = await axios.get("http://localhost:5000/account/users");
            if(response.status !== 200)
            {
                alert("Failed to fetch user.");
            }
            setUser(response.data.users);
            alert("Users fetched successfully");

        }catch(err){
            alert("Error fetching users. Please try again later.");
        }
    }

    const removeUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/account/remove/${id}`); 
            if (response.status === 200) {
                alert('User deleted successfully');
                setUser(prevUsers => prevUsers.filter(user => user._id !== id)); 
            } else {
                console.error('Error deleting user:', response.data);
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    
    const toogleUser = async(id, status, role) =>{
        try{
            const response = await axios.put(`http://localhost:5000/account/update/${id}`,{status:status, role:role});
            if(!(response.status === 200)){
                console.error("Failed to update user status");
                alert("Failed to update user status");
            }
            setUser(prevUsers=> prevUsers.map(user => user._id === id ? {...user, status:status, role:role} : user));
            alert("User status updated successfully");
        }catch(err){
            console.error(err)
            alert("Failed to update user status");
        }
    }

}