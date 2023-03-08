import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import contact from './Assets/contact.png'

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_z8c0y99', 'template_9lqqobl', form.current, 'MXtYNMF86gUdC-4Df')
      .then((result) => {
        console.log(result.text);
        console.log("message sent successfully");
        alert("Message Sent Successfully")
      }, (error) => {
        console.log(error.text);
        alert("Opps, some error happened!")
      });
  };
  return (
    <div className='container shadow-lg p-3 mb-5 bg-body rounded'>
      <h2>Write Us a Message👇</h2>
      <div className="row">
        <div className="col">
          <form ref={form} onSubmit={sendEmail}>
            <div className='mb-3'>
              <label className='fs-3'>Name</label>
              <input className='form-control' type="text" name="user_name" />
            </div>
            <div className='mb-3'>
              <label className='fs-3'>Email</label>
              <input className='form-control' type="email" name="user_email" />
            </div>
            <div className='mb-3'>
              <label className='fs-3'>Message</label>
              <textarea className='form-control' style={{height:"100px"}} name="message" placeholder='Write your message' />
            </div>
            <input className='mt-1 btn btn-success btn-lg' type="submit" value="Send" />
          </form>
        </div>
        <div className="col">
          <img className='img-fluid ml-5' src={contact} alt="contact" />
        </div>
      </div>
    </div>
  )
}

export default Contact
