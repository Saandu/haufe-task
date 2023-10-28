import {defineStore} from "pinia";
import axios from "axios";
import router from "../router";

interface State {
    userType: string,
    userName: string,
    userId: number,
    scooters: [],
    users: [],
    requests: [],
}

export const useStore = defineStore("store", {
    state: () : State => ({
        userType: "",
        userId: 0,
        userName: "",
        scooters: [],
        users: [],
        requests: [],
    }),
    getters: {},
    actions: {
        async login(email: string, password:string) {
            try {

                const LoginObj = {
                    email: email,
                    password: password
                }

                const response = await axios.get("/users", {
                    params: LoginObj,
                });
                this.userType = response.data[0].userType;
                this.userName = response.data[0].userName;
                this.userId = response.data[0].userId;
                if (response.status === 201 || response.status === 200) {
                    localStorage.setItem("user_type", this.userType);
                    localStorage.setItem("user_id", this.userId);

                    if (this.userType === "client"){
                        await router.push({path: "/client-dashboard"});
                    }
                    else {
                        await router.push({path: "/admin-dashboard"});
                    }

                }
            } catch (error: any) {
                if (error.response.status === 401 || error.response.status === 403) {
                    localStorage.removeItem("user_type");
                    await router.push({path: "/login"});
                }
            }
        },

        async logout () {
            localStorage.removeItem("user_type");
            this.userType = ""
            this.userName = ""
            await router.push({path: "/login"});
        },

        async getScooters() {
            try {
                const response = await axios.get("/scooters",);
                this.scooters = response.data;
                console.log(this.scooters)

            } catch (error: any) {
                if (error.response.status === 401 || error.response.status === 403) {
                    localStorage.removeItem("user_type");
                    await router.push({path: "/login"});
                }
            }
        },
        async getUsers() {
            try {
                const response = await axios.get("/users",);
                this.users = response.data;
                console.log(this.users)

            } catch (error: any) {
                if (error.response.status === 401 || error.response.status === 403) {
                    localStorage.removeItem("user_type");
                    await router.push({path: "/login"});
                }
            }
        },
        async getRequests() {
            try {
                const response = await axios.get("/requests",);
                this.requests = response.data;
                console.log(this.requests)

            } catch (error: any) {
                if (error.response.status === 401 || error.response.status === 403) {
                    localStorage.removeItem("user_type");
                    await router.push({path: "/login"});
                }
            }
        }
    }
});
