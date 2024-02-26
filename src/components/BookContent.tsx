// BookContent.js
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Editor, useDomValue } from 'reactjs-editor';
import '../App.css';
import { books } from './Home';
const BookContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {dom,setDom} = useDomValue()
  const handleGoBack = () => {
    navigate(-1); // Go back one step in history
  };
  const selectedBook = books.filter((book,i)=>{
    return id === String(book.id)
  })
  const notify = () => toast("HTML content saved.",{style:{background:"#f2dfce",color:'#000'},hideProgressBar:true});


  const handleSave = ()=>{
    const updatedDomValue  = {
      key: dom?.key,
      props: dom?.props,
      ref: dom?.ref,
      type: dom?.type,
    }

    localStorage.setItem(`dom${selectedBook[0].id}`,JSON.stringify(updatedDomValue))

    notify()
  }

  useEffect(()=>{
    
    const persistedDom = localStorage.getItem(`dom${selectedBook[0].id}`)
    if(persistedDom){
      setDom(JSON.parse(persistedDom))
    }
   
  },[selectedBook[0].id])
  return (
    <motion.div transition={{ type: 'spring', damping: 40, mass: 0.75 }}
    initial={{ opacity: 0, x: 1000 }} animate={{ opacity: 1, x: 0 }}>
     <motion.section transition={{ type: 'spring', damping: 44, mass: 0.75 }}
            initial={{ opacity: 0, y: -1000 }} animate={{ opacity: 1, y: 0 }} className='appBar'>
     <div className="left-icons" onClick={handleGoBack}>
    <i style={{fontSize:'20px',cursor:'pointer'}} className="fas fa-chevron-left"></i> 
    </div>
  <div className="title">  <h2 style={{textAlign:'center',textTransform:'uppercase',paddingLeft:'100px'}}> {selectedBook[0].title}</h2></div>
  <div className="icons">
    <button className='saveButton' onClick={handleSave}>Save</button>
    <i style={{marginRight:'20px',fontSize:'20px'}} className="fas fa-cog"></i> 
    <i style={{marginRight:'20px',fontSize:'20px'}} className="fas fa-share"></i> 
    <i style={{marginRight:'20px',fontSize:'20px'}} className="fas fa-search"></i> 
  </div>
  </motion.section>


    {
        <Editor 

      htmlContent ={`<main className='bookContainer'>
      <aside>
        <h1 className="center">${selectedBook[0].title}</h1>
        <span className='center small'> By ${selectedBook[0].author}</span>
      ${selectedBook[0].content}
      </aside>
      
        </main>`}
 
      />
    }

<ToastContainer />

    </motion.div>
  );
};

export default BookContent;
