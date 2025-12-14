import { useEffect, useState } from "react";
import one from "../../assets/one.png";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { userNameUpdate } from "../slicess/counterSlice";

const Setting = () => {
  const data = useSelector((state) => state.userInfo.value.user);
  const dispatch = useDispatch();

  const [showNameInput, setShowNameInput] = useState(false);
  const [showStatusInput, setShowStatusInput] = useState(false);

  const [updateName, setUpdateName] = useState("");
  const [statusText, setStatusText] = useState("");
  const [latestStatus, setLatestStatus] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();

  /* ================= READ USER STATUS ================= */
  useEffect(() => {
    if (!data?.uid) return;

    const userStatusRef = ref(db, `users/${data.uid}/status`);

    const unsubscribe = onValue(userStatusRef, (snapshot) => {
      setLatestStatus(snapshot.val() || "");
    });

    return () => unsubscribe();
  }, [data?.uid]);

  /* ================= UPDATE NAME ================= */
  const handleNameUpdate = () => {
    if (!updateName || !user || !data?.uid) return;

    updateProfile(user, { displayName: updateName });

    set(ref(db, `users/${data.uid}/username`), updateName);

    dispatch(userNameUpdate(updateName));

    const updatedUserInfo = { ...data, displayName: updateName };
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ user: updatedUserInfo })
    );

    setUpdateName("");
    setShowNameInput(false);
  };

  /* ================= UPDATE STATUS ================= */
  const handleSubmitStatus = () => {
    if (!statusText || !data?.uid) return;

    const userStatusRef = ref(db, `users/${data.uid}/status`);
    set(userStatusRef, statusText);

    setStatusText("");
    setShowStatusInput(false);
  };

  return (
    <div className="px-4 md:px-10">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">

        {/* LEFT CARD */}
        <div className="w-full lg:w-[540px] bg-white rounded-2xl shadow p-6">
          <h3 className="text-2xl font-bold">Profile Settings</h3>

          {/* PROFILE INFO */}
          <div className="flex flex-col sm:flex-row items-center gap-5 mt-6">
            <img
              src={one}
              alt=""
              className="w-20 h-20 sm:w-24 sm:h-24"
            />
            <div className="text-center sm:text-left">
              <p className="text-xl font-bold">
                {data?.displayName}
              </p>
              <p className="text-gray-600">
                {latestStatus}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-10 space-y-6">

            {/* EDIT NAME */}
            <div>
              <p
                onClick={() => setShowNameInput(!showNameInput)}
                className="cursor-pointer font-medium"
              >
                Edit Profile Name
              </p>

              {showNameInput && (
                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <input
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full"
                    placeholder="Enter new name"
                  />
                  <button
                    onClick={handleNameUpdate}
                    className="bg-black text-white px-6 py-2 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>

            {/* EDIT STATUS */}
            <div>
              <p
                onClick={() => setShowStatusInput(!showStatusInput)}
                className="cursor-pointer font-medium"
              >
                Edit Profile Status
              </p>

              {showStatusInput && (
                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <input
                    value={statusText}
                    onChange={(e) => setStatusText(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full"
                    placeholder="What's on your mind?"
                  />
                  <button
                    onClick={handleSubmitStatus}
                    className="bg-black text-white px-6 py-2 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>

            <p className="cursor-pointer font-medium">
              Edit Profile Photo
            </p>
            <p className="cursor-pointer font-medium">
              Help
            </p>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="w-full lg:w-[540px] bg-white rounded-2xl shadow flex items-center justify-center">
          <p className="text-gray-400">Coming Soon</p>
        </div>

      </div>
    </div>
  );
};

export default Setting;
