import * as Yup from "yup";

export default Yup.object().shape({
    accessToken: Yup.string().required()
});
