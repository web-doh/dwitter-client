import reducer from "./reducer";
import sagas from "./sagas";
import * as actions from "./actions";
import * as types from "./types";

const loginUser = { reducer, sagas, actions, types };

export default loginUser;
