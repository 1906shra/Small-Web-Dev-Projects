export default function UserProfile({params}:any){
    return(
        <div>
            <h1>Profile Page</h1>
            <hr/>
            <p className="text-4xl">This is a profile page{params.id}</p>
            </div>
    )
}