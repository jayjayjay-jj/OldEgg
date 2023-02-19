import SignUp from "@/api/sign-up";
import RectangularInputField from "@/pages/components/RectangularInputField";
import User from "@/types/User";
import { useRouter } from "next/router";
import { useState } from "react";
import style from '../../styles/SignUpPage.module.scss'


const SignUpPage = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter()

    const handleFormSubmit = async (e:any) => {
        e.preventDefault();

        const newUser:User = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            mobile_phone_number: mobilePhoneNumber,
            password: password,
            role_id: 1,
            subscribed: true ,
            status: "Active"
        }

        console.log(firstName)
        console.log(lastName)
        console.log(email)
        console.log(mobilePhoneNumber)
        console.log(password)

        const response = await SignUp(newUser)
        if(response === 404) {
            alert("Error in sign-up")
        } else {
            alert("Sign-up successfull! Account created.")
            router.push("/sign-in")
        }
    }

    return ( 
        <form className={style.index} onSubmit={handleFormSubmit}>
            <RectangularInputField value={firstName} onChange={setFirstName} required placeholder="First Name" />
            <RectangularInputField value={lastName} onChange={setLastName} required placeholder="Last Name" />
            <RectangularInputField value={email} onChange={setEmail} required placeholder="Email Address" email />
            <RectangularInputField value={mobilePhoneNumber} onChange={setMobilePhoneNumber} required placeholder="Mobile Phone Number" number />
            <RectangularInputField value={password} onChange={setPassword} required placeholder="Password" password />    
            <button>Sign Up</button>    
        </form>
    );
}

export default SignUpPage;