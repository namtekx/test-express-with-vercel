import * as Yup from "yup";

export default Yup.object().shape({
    name: Yup.string().required(),
    username: Yup.string().required(),
    password: Yup.string().min(6).required(),
    phone: Yup.string(),
    email: Yup.string().email().required(),
    photo: Yup.string(),
    active: Yup.boolean().default(true),
});
