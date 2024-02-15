import React, { useState, useEffect } from "react";
import Profile from "../../routes/Profile";
import { useUser } from "../UserContext";
import H3 from "../UI/H3";
import H4 from "../UI/H4";

export default function Settings() {
  const { user, setUser } = useUser();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedBio, setEditedBio] = useState(user.bio);
  const [editedLocation, setEditedLocation] = useState(user.location);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editedEmail, setEditedEmail] = useState(user.email);
  // const [editedPassword, setEditedPassword] = useState("");

  useEffect(() => {
    // Fetch user data when the component mounts
    fetch(`/users/${user.id}`)
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData); // Update the user data in the context
        setEditedBio(userData.bio); // Update the edited bio
        setEditedLocation(userData.location); // Update the edited location
        setEditedEmail(userData.email); // Update the edited email
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleToggleEditingProfile = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const handleToggleEditingUser = () => {
    setIsEditingUser(!isEditingUser);
  };

  const handleSaveChanges = () => {
    const patchData = {
      bio: editedBio,
      location: editedLocation,
    };

    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchData),
    })
      .then((response) => {
        if (response.ok) {
          // If the PATCH request is successful, exit the editing mode
          setIsEditingProfile(false);
          // Refresh user data after successful save
          fetch(`/users/${user.id}`)
            .then((response) => response.json())
            .then((userData) => {
              setUser(userData); // Update the user data in the context
            })
            .catch((error) => {
              console.error("Error refreshing user data:", error);
            });
        } else {
          throw new Error("Failed to save changes");
        }
      })
      .catch((error) => {
        console.error("Error saving changes:", error);
      });
  };

  const handleChangeEmail = () => {
    const patchData = {
      email: editedEmail,
    };

    fetch(`/update-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchData),
    })
      .then((response) => {
        if (response.ok) {
          // Update the user email in the context
          setUser((prevUser) => ({
            ...prevUser,
            email: editedEmail,
          }));
          // Exit the editing mode
          setIsEditingUser(false);
        } else {
          throw new Error("Failed to change email");
        }
      })
      .catch((error) => {
        console.error("Error changing email:", error);
      });
  };

  // const handleChangePassword = () => {
  //   const currentPassword = prompt("Enter your current password:");

  //   if (!currentPassword) {
  //     // User cancelled entering the current password
  //     return;
  //   }

  //   const patchData = {
  //     current_password: user.password, // You should provide the current password
  //     new_password: editedPassword,
  //   };

  //   fetch(`/update-password`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(patchData),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         // Exit the editing mode
  //         setIsEditingUser(false);
  //       } else {
  //         throw new Error("Failed to change password");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error changing password:", error);
  //     });
  // };

  return (
    <Profile>
      <div className="dark:text-gray-100">
        <H3>
          Settings for user: <b>{user.username}</b>
        </H3>
        <div>
          <H4>User settings</H4>
          <div>
            <label htmlFor="email" className="font-bold">
              Email:
            </label>
            {isEditingUser ? (
              <input
                type="text"
                id="email"
                value={editedEmail}
                className="text-gray-900"
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            ) : (
              <div>{user.email}</div>
            )}
          </div>
          <div>
            {/* <label htmlFor="password" className="font-bold">
              Password:
            </label>
            {isEditingUser ? (
              <input
                type="password"
                id="password"
                value={editedPassword}
                className="text-gray-900"
                onChange={(e) => setEditedPassword(e.target.value)}
              />
            ) : (
              "*******"
            )} */}
            {isEditingUser ? (
              <>
                <button
                  className="bg-purple-500 dark:bg-purple-400 text-sm p-2 m-1 rounded-xl text-white dark:text-black"
                  onClick={handleChangeEmail}
                >
                  Update Email
                </button>
                {/* <button
                  className="bg-purple-500 dark:bg-purple-400 text-sm p-1 rounded-xl text-white dark:text-black"
                  onClick={handleChangePassword}
                >
                  Update Password
                </button> */}
                <button
                  className="bg-purple-500 dark:bg-purple-400 text-sm p-2 m-1 rounded-xl text-white dark:text-black"
                  onClick={handleToggleEditingUser}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="bg-purple-500 dark:bg-purple-400 text-sm p-2 m-1 rounded-xl text-white dark:text-black"
                onClick={handleToggleEditingUser}
              >
                Edit User
              </button>
            )}
          </div>
          <H4>Profile settings</H4>
          <label htmlFor="bio" className="font-bold">
            Bio:
          </label>
          {isEditingProfile ? (
            <textarea
              id="bio"
              value={editedBio}
              maxlength="100"
              className="text-gray-900"
              onChange={(e) => setEditedBio(e.target.value)}
            />
          ) : (
            <div>{user.bio}</div>
          )}
        </div>
        <div>
          <label htmlFor="location" className="font-bold">
            Location:
          </label>
          {isEditingProfile ? (
            <textarea
              id="location"
              maxlength="50"
              value={editedLocation}
              className="text-gray-900"
              onChange={(e) => setEditedLocation(e.target.value)}
            />
          ) : (
            <div>{user.location}</div>
          )}
        </div>
        <div>
          {isEditingProfile ? (
            <>
              <button
                className="bg-purple-500 dark:bg-purple-400 text-sm p-2 m-1 rounded-xl text-white dark:text-black"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                className="bg-purple-500 dark:bg-purple-400 text-sm p-2 m-1 rounded-xl text-white dark:text-black"
                onClick={handleToggleEditingProfile}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="bg-purple-500 dark:bg-purple-400 text-sm p-2 m-1 rounded-xl text-white dark:text-black"
              onClick={handleToggleEditingProfile}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </Profile>
  );
}
