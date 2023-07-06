import { useForm } from '@formspree/react';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function FeedbackForm() {
  const [state, handleSubmit] = useForm("mbjewlgj");
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    await handleSubmit(event);
    if (state.succeeded) {
      navigate('/feedbacksubmit')
    }
    
  }

  useEffect(() => {
    onSubmit()
  },[])

  const handleCloseModal = () => {
    navigate('/')
  }

  return (
    <div className="fixed font-poppins top-0 left-0 w-screen h-screen bg-gray-700 bg-opacity-75 flex justify-center items-center z-50" 
         onClick={handleCloseModal}
    >
      <form onSubmit={onSubmit} 
            className="bg-white p-8 w-5/6 md:w-1/3 rounded-lg shadow-md" 
            onClick={(event) => event.stopPropagation()}
      >

        <h2 className="text-lg font-poppins text-slate-900 font-bold mb-4">Send Us Your Feedback</h2>
        
        <div className="mb-4">
          <label className="block text-indigo-800 font-bold mb-2" 
                 htmlFor="name"
                 >Name
          </label>

          <input
            className="border text-slate-700 focus:outline-none focus:border-gray-200 border-gray-200 p-2 rounded-lg w-full"
            id="name"
            type="text"
            name="name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-indigo-900 font-bold mb-2" 
                 htmlFor="email"
                 >Email
          </label>

          <input
            className="border text-slate-700 focus:outline-none focus:border-gray-200 border-gray-200 p-2 rounded-lg w-full"
            id="email"
            type="email"
            name="email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-indigo-800 font-bold mb-2" 
                 htmlFor="feedback"
                 >Feedback
          </label>

          <textarea
            className="border text-slate-700 focus:outline-none border-gray-400 p-2 rounded-lg w-full h-32"
            id="feedback"
            name="feedback"
            required
          >
          </textarea>
        </div>
        
        
          <button
            type="submit"
            disabled={state.submitting}
            className="bg-slate-800 hover:bg-indigo-500 text-white rounded-lg py-2 px-4"
          >
            {state.submitting ? 'Submitting...' : 'Submit'}
          </button>
        

      </form>
      
    </div>
  );
}
