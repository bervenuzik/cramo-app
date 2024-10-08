import { useContext } from "react";
import {Context} from "./AppContext.jsx"

const rowHeigth = '1.5rem'

function MaterialList (){

    const {data} = useContext(Context);
    const materialList = data.material;
    const filtredItems = materialList.filter(item=> item.amount > 0 )

    const filtredTable = <table className="max-w-[90%] min-w-[350px] w-full text-left border-solid border-[3px] rounded-md font-table backdrop-blur-sm">
                        <thead className="sticky">
                            <tr className="w-full h-[3rem] bg-red-500"> 
                                <th>Art. nummer</th>
                                <th>Namn</th>
                                <th>Vikt</th>
                                <th>Antal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtredItems.map((item , index)=>{return (
                                <tr key={index} className="even:bg-red-200">
                                    <th className="max-w-">{item.id}</th>
                                    <th>{item.namn}</th>
                                    <th>{item.vikt}</th>
                                    <th>{item.amount}</th>
                                </tr>
                            )
                            })}
                        </tbody>
                        </table>

    
return(
    <div className="w-full py-5 px-10 flex justify-center overflow-hidden overflow-scroll">
            {filtredTable}
    </div>
)

}

export default MaterialList;