import { FaCommentDots,  FaRegThumbsDown, FaRegThumbsUp,  } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useMyPost from "../../../components/hooks/useMyPost";


const MyPost = () => {

    const [post,loading, refetch] = useMyPost()
    
    console.log(post)
    const axiosSecure = useAxiosSecure()

     const handleDeleteItem = (item) =>{
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then( async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/allPost/${item._id}`);
                    // console.log(res.data);
                    if(res.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${item.post_title} has been deleted`,
                            showConfirmButton: false,
                            timer: 1500
                          });
                   
                    }
                }
              });
        }


    return (
        <div>
            <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-white underline">My All Posts</h1>
            </div>
    <div className="grid lg:grid-cols-2 grid-cols-1 col-span-1 gap-10 mx-3">

    { 
           post.map( (item) => <div
           key={item._id}
           
           >
               <div className="relative flex flex-col rounded-xl backdrop-blur-md bg-white/10  text-white shadow-md " >
               <figure><img  className="rounded-t-lg lg:h-80 h-full w-full" src={item.post_image} alt="car!"/></figure>
               <div className=" flex flex-col gap-3 px-2 pb-6 " >
                 
                 <h1 className="text-3xl border-b-2 border-t-2 mt-5 border-sky-300 py-2">{item.post_title}</h1>
                   
                 <p>Post Date: {item.time}</p>
               
                <div className="flex justify-between">
                <div className="flex gap-10 ">
                <p className="flex gap-1 items-center "><FaRegThumbsUp className="text-2xl text-cyan-500"/> {item.up_votes_count}</p>
                 <p className="flex gap-1 items-center pt-2"><FaRegThumbsDown className="text-2xl text-cyan-500"/> {item.down_votes_count}</p>
                </div>
                 <Link to={`/dashboard/postComments/${item._id}`}>
                 <p className="items-center flex gap-2 text-xl btn btn-sm bg-cyan-400 text-white border-none">comments <FaCommentDots /></p>
                 </Link>
                </div>
                     <div className="text-center mt-4">
                     <button
                           onClick={()=>handleDeleteItem(item)}
                           className="btn btn-ghost w-36 bg-cyan-700">
                           Delete your post
                           </button>
                     </div>
               </div>
               </div>
               </div>)
        }

    </div>

        </div>
    );
};

export default MyPost;