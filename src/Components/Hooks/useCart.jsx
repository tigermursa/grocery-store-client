import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

// perfect one
const useCart = () => {
  const { user, loading } = useContext(AuthContext);

  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/cart?email=${user?.email}`);
      return res.data;
    },
  });

  return [cart, refetch];
};

export default useCart;
