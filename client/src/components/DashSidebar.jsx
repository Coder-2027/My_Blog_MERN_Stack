import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    // console.log(urlParams);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab("profile");
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/v1/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        // console.log("error signing out ", data.message);
        dispatch(signoutSuccess());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab == "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser.isAdmin && (
            <Link to={"/dashboard?tab=post"}>
              <Sidebar.Item
                active={tab == "post"}
                icon={HiDocumentText}
                // label={"Admin"}
                // labelColor="dark"
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}

          {currentUser.isAdmin && (
            <Link to={"/dashboard?tab=users"}>
              <Sidebar.Item
                active={tab == "users"}
                icon={HiOutlineUser}
                // label={"Admin"}
                // labelColor="dark"
                as="div"
              >
                Users
              </Sidebar.Item>
            </Link>
          )}

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
