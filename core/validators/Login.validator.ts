import * as Yup from "yup";

export default Yup.object().shape({
    email: Yup.string().email(),
    password: Yup.string().min(6),
});
