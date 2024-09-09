import axios from "axios";
export const getTokenInfo = async (listToken: String[]) => {
  try {
    const res = await axios.get("/api/get-token", {
      params: {
        chain: "eth",
        addresses: listToken,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
