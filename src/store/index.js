import { createStore } from "vuex";

import system from "./modules/system";
import cities from "./modules/cities";
import schools from "./modules/schools";
import students from "./modules/students";
import teachers from "./modules/teachers";
import auth from "./modules/auth"

export default createStore({
    modules: {
        system,
        cities,
        schools,
        students,
        teachers,
        auth
    },
});
