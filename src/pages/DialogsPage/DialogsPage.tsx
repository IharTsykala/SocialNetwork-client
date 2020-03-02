import React, {useState, useEffect} from 'react'
import DialogsPageCSS from './DialogsPage.module.css'
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import Service from "../../services/service-user"
import { LoadingState } from '../../shared/constants/user-from-view-mode.enum'

type DialogsPageProps = {
    user: User
    dispatch: any
  }

const DialogsPage: React.FunctionComponent<DialogsPageProps> =({user})=> {
    const [listDialogs, setListDialogs]: any = useState([])
    const [stateLoading, setStateLoading]: any = useState(LoadingState.loading)

    useEffect(() => {
        getListDialogs()    
    }, [])

    async function getListDialogs () {
        try {
            const listForRender = await Service.getAllUsers()           
            if(listForRender[0]) {               
                setStateLoading(LoadingState.loaded) 
                setListDialogs(listForRender)              
            }           
        } catch(e) {
            console.log(e)
            setStateLoading(LoadingState.loaded)
        } 
    }

    return (    
        <>   
        {stateLoading==='loading' && <h1>Ожидайте ответа</h1>}
        {stateLoading==='loaded'&& (
            <div className={DialogsPageCSS.dialogs_page}>
           <section className={DialogsPageCSS.dialogs_page__rules_dialogs}>
               <ul className={DialogsPageCSS.dialogs_page__rules_dialogs__list_dialogs}> 
               {listDialogs.length > 0 &&             
                 listDialogs.map((dialogCard: any) => <div key={dialogCard._id} className={DialogsPageCSS.dialogs_page__rules_dialogs__list_dialogs__card}><li>{dialogCard.login} </li> </div>               
              )}
               </ul> 
               <button className={DialogsPageCSS.dialogs_page__add_dialogs_button}>add dialog</button>              
           </section>
           <section className={DialogsPageCSS.dialogs_page__dialog_page__window_dialog}>
               Choose dialog               
           </section>         
        </div>
        ) } 
        {stateLoading==='notFound' && (
            
        <h1>not found</h1>
      )}
      {stateLoading==='error' && (
        <h1>ошибка</h1>
      )}      
       </>
    )
}

const mapStateToProps = (state: any) => ({
    user: state.common.user
  })
  
  export default connect(mapStateToProps)(DialogsPage)