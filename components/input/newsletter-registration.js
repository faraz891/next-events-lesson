import { useRef, useContext } from 'react';
import classes from './newsletter-registration.module.css';
import { NotificationContext } from "../../context/notificationContext"

function NewsletterRegistration() {
  const emailRef = useRef()
  const { showNotification } = useContext(NotificationContext)

  function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = emailRef.current.value

    showNotification({
      title: "Signing..",
      message: "Signing up",
      status: "pending"
    })

    fetch('/api/newsLetter/', { method: "POST", body: JSON.stringify({ email: enteredEmail }), headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return res.json().then(data => {
          throw new Error(data.message || 'Something went wrong')
        })
      })
      .then(data => showNotification({
        title: "Signed Up",
        message: "Signed up successfully",
        status: "success"
      }))
      .catch(error => {
        showNotification({
          title: "Error",
          message: "Error in sending email",
          status: "error"
        })
      })

  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
