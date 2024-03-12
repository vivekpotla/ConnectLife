import React from 'react'

function MyRequests() {
 

   let [requests,setRequests] = useState([])

    useEffect(() => {
        const fetchRequests = async () => {
          try {
            //get recipient Id from local storage
            let recipientId= JSON.parse(localStorage.getItem('user'))._id;
             let response=  await axios.post('http://localhost:5000/api/recipient/view-requests', {recipientId});
             if(response.status==200)
             setRequests(response.data)
           } catch (error) {
            console.error('Error loading requests:', error);
          }
        };
        fetchRequests()
        return () => {};
      }, []); 
  return (
    <div>My Requests</div>
  )
}

export default MyRequests