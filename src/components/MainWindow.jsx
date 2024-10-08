
import {useContext} from 'react'
import{Context} from "./AppContext.jsx"
import GreetingWindow from './GreetingWindow.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import MaterialList from './MaterialList.jsx'


function MainWindow(){
    const{data}  = useContext(Context)

    return(
        <div className="grow flex flex-col items-center ">
            {data.material == undefined && <GreetingWindow/>}
            {(!data.material && data.error) && <ErrorMessage message={data.error.massage}/>}
            {data.material && <MaterialList/>}
        </div>
    )
}
export default MainWindow