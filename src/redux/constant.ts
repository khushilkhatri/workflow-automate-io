import { getData, getUser } from "../_services/workflow.service";

export default {
  filter: "All",
  search: "",
  data: getData(),
  user: getUser()
};
