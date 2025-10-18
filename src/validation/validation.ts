import * as yup from 'yup'
// export const step1schima=yup.object().shape({
//     brand_name : yup.string().required("brandname is required"),
//     country : yup.string().required("country is required"),
//     category : yup.string().required("category is required"),
//     sub_category : yup.string().optional(),
//       tags : yup.array().of(
//         yup.object({
//             label : yup.string().required().optional(),
//             value : yup.string().required().optional()
//         })
//       ).required(),
//       ischeck : yup.boolean().oneOf([true]).required()
// })
// export const step2schima = yup.object().shape({
//     discription : yup.string().required("discription is required").required(),
//     platform : yup.array().of(
//         yup.object({
//             label : yup.string().required(),
//             url :yup.string().url().nullable().required()
//         })
//     )
// })
export const val = yup.object().shape({
    brand_name : yup.string().min(3).required()
})