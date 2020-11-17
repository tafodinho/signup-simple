import axios from 'axios';
const signupValidate = (values) => {
    const errors = {
    };
  
    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    if (!values.lastName) {
      errors.lastName = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8) {
      errors.password = 'Must be at least 8 characters';
    } else if (!/[A-Z]+/.test(values.password)) {
      errors.password = 'Password must contain at least one caps';
    } else if (!/[0-9]+/.test(values.password)) {
      errors.password = 'Password must contain at least one digit';
    }
    if (!values.cpassword) {
      errors.cpassword = 'Required';
    } else if (values.password !== values.cpassword) {
      errors.cpassword = 'Password does not match';
    }
    return errors;
  };

  const asyncValidate = (values) => {
    const REQUEST_URL = "https://api.raisely.com/v3/"
    const data = {
      campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
      data: {email: values.email}
     }
    return axios.post(`${REQUEST_URL}check-user`, data).then((res) => {
      console.log(res.data)
      if(res.data.data.status === "EXISTS") {
        throw { email: 'Email is taken please choose another email' }
      }
    })
  }
  
  
  export {
    signupValidate,
    asyncValidate
  };
  