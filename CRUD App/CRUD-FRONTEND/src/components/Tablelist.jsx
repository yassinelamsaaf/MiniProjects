export default function Tablelist() {

    const clients = [ 
        {id:1, name: "John Doe", email: "John.Doe@gmail.com", job: "SWE", rate:"100" , isactive: true },
        {id:2, name: "John1 Doe", email: "John1.Doe@gmail.com", job: "SWE1", rate:"101" , isactive: true },
        {id:3, name: "John2 Doe", email: "John2.Doe@gmail.com", job: "SWE2", rate:"102" , isactive: false },
    
    ]

    return(
        <>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>job</th>
                        <th>Rate</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody className="hover">
                    {/* row 1 */}

                    {clients.map((client) => (
                        <tr>
                        <th>{client.id}</th>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>{client.job}</td>
                        <td>{client.rate}</td>
                       
                        <td>
                            <button className={`btn rounded-full w-20 ${client.isactive ? `btn-primary` : `btn-outline btn-primary`}`}>

                                {client.isactive? 'active' : 'inactive'}

                            </button>
                        </td>
                        <td>
                            <button className="btn btn-secondary">Edit</button>
                        </td>
                        <td>
                            <button className="btn btn-accent">Delete</button>
                        </td>
                    </tr>
                    

                    ))}
                        
                    
                    
                    </tbody>
                </table>
            </div> 
        </>
    )
}