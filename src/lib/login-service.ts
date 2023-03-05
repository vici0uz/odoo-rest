import restClient from "./rest-api";

class LoginService {
  login = (data) => new Promise((resolve, reject) => {
    const dat = {
      params: {
        login: data.username,
        password: data.password,
        db: "coopman",
      },
    };
    restClient.post(`/auth`, dat).then((response) => {
      console.log(response)
      if (!response.data.error) {
        console.log('ok')
        resolve(response)
      } else {
        console.log('error')
        reject(response)
      }
    });
  })
}
// login(data: any): Promise<any> {
//   const dat = {
//     params: {
//       login: data.username,
//       password: data.password,
//       db: "coopman",
//     },
//   };
//   return restClient.post(`/auth`, dat);
// }


export default new LoginService();
