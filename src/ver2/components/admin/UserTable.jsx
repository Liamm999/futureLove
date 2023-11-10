import { useEffect, useRef, useState } from "react";
import { IoIosMore } from "react-icons/io";
import Switch from "react-switch";
import MoreOption from "./MoreOption";

const UserTable = (props) => {
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [showMoreAtIndex, setShowMoreAtIndex] = useState(-1);

  const isMobile = width <= 768;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current) {
        if (!menuRef.current.contains(e.target)) setShowMoreAtIndex(-1);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const handleCheck = (event) => {
    let updatedList = [...checkedUsers];
    if (event.target.checked) {
      updatedList = [...checkedUsers, Number(event.target.value)];
    } else {
      updatedList.splice(checkedUsers.indexOf(Number(event.target.value)), 1);
    }
    setCheckedUsers(updatedList);

    if (updatedList.length === props.data.length) {
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }
  };

  useEffect(() => {
    if (isCheckedAll) {
      setCheckedUsers(props.data.map((user) => user.id_user));
    } else {
      if (checkedUsers.length < props.data.length) return;
      setCheckedUsers([]);
    }
  }, [isCheckedAll, props.data]);

  return (
    <>
      <div className="flex flex-col bg-white w-[95%] rounded-xl mt-28 p-4 lg:mt-20 sm:p-12">
        <div className="grid grid-cols-12 items-center rounded-xl bg-[#E2E8F0] sm:p-8 mb-6 text-3xl">
          {/* <input
            checked={isCheckedAll}
            type="checkbox"
            className="w-6 h-6 sm:w-8 sm:h-8"
            onChange={() => setIsCheckedAll(!isCheckedAll)}
          /> */}
          <span className="text-sm sm:text-3xl col-span-2 col-start-3 sm:col-start-3">
            username
          </span>
          <span className="text-sm sm:text-3xl col-span-3 lg:col-span-3">
            email
          </span>
          <span className="text-sm sm:text-3xl col-span-3 lg:col-span-2 lg:col-start-9">
            ip address
          </span>
          <span className="text-sm sm:text-3xl">status</span>
        </div>
        {props.data.map((user, index) => (
          <div
            className="grid grid-cols-12 items-center text-3xl mb-6 p-2 sm:p-0"
            key={user.id_user}
          >
            {/* <input
              checked={checkedUsers.includes(user.id_user)}
              value={user.id_user}
              type="checkbox"
              className="w-4 h-4 lg:w-10 lg:h-10 sm:ml-8"
              onChange={handleCheck}
              id={user.id_user}
            /> */}
            <img
              src={user.link_avatar}
              alt="avatar"
              className="w-12 h-12 sm:w-24 sm:h-24 rounded-full col-start-2"
            />
            <span className="text-sm col-span-2 sm:text-3xl ml-2 sm:ml-6">
              {user.user_name}
            </span>
            <span className="text-xs sm:text-3xl col-span-4">{user.email}</span>
            <span className="text-xs sm:text-3xl col-span-2 lg:col-span-2 col-start-9">
              {user.ip_register}
            </span>
            {user.status === 1 || user.status === null ? (
              <>
                <span
                  className="text-blue-500 cursor-pointer text-lg sm:text-2xl"
                  onClick={() => props.handleActiveAccount(user.id_user)}
                >
                  Inactive
                </span>
              </>
            ) : (
              <>
                <Switch
                  checked={user.status === 2}
                  onChange={(event) =>
                    props.handeUserStatus(user.id_user, event)
                  }
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={isMobile ? 16 : 30}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={isMobile ? 12 : 20}
                  width={isMobile ? 40 : 48}
                  className="react-switch"
                  id="material-switch"
                />
              </>
            )}
            <div>
              <IoIosMore
                className="text-center w-full text-6xl mb-2 cursor-pointer"
                onClick={() => {
                  if (index === showMoreAtIndex) {
                    setShowMoreAtIndex(-1);
                  } else setShowMoreAtIndex(index);
                }}
              />
              {index === showMoreAtIndex && (
                <div ref={menuRef}>
                  <MoreOption
                    userData={user}
                    hanldeDelete={() => props.deleteUser(user.id_user)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserTable;
