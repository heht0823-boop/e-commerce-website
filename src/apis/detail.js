import httpInstance from "@/utils/http";
export const getDetail = async (id) => {
  return httpInstance({
    url: "/goods",
    params: {
      id,
    },
  });
};
