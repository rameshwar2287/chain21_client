/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import { useDispatch, useSelector } from "react-redux";
import { shareReferralCode } from "../../utils/additionalFunc";
import Tabs from "../../components/Screen/UserPanel/Tabs";
import { setLoading } from "../../redux/slices/loadingSlice";
import { updateProfile } from "../../api/user.api";
import { getUserProfile } from "../../api/auth.api";
import { updateUserData } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const userInfo = useSelector((state) => state?.isLoggedUser?.data);
  const location = window.location.origin;
  // const referCode = `${location}/register?referral=${userInfo?.id}`;
  const referCode = `${location}/register?referral=${userInfo?.referralLink}`;
  const [profileData, setProfileData] = useState();
  useEffect(() => {
    setProfileData((prev) => ({
      ...prev,
      id: userInfo?.id,
      referralLink: userInfo?.referralLink,  // ✅ Add this line
      walletAddress: userInfo?.account,
      username: userInfo?.username,
      email: userInfo?.email || "Not Available",
      mobile: userInfo?.mobile || "Not Available",
      country: userInfo?.country || "Not Available",
      countryCode: userInfo?.countryCode || "Not Available",
      picture:
        userInfo?.picture ||
        "https://api.dicebear.com/8.x/lorelei/svg?seed=Lanre",
    }));
  }, [userInfo]);
  

  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const tabs = [
    { id: "profile", label: "Edit Profile", icon: "fa-user-edit" },
    { id: "share", label: "Share Profile", icon: "fa-share-alt" },
    // { id: "security", label: "Security", icon: "fa-shield-halved" },
    // { id: 'notifications', label: 'Notifications', icon: 'fa-bell' },
  ];

  return (
    <div className="space-y-8">
      {/* <div>
                <h1 className="text-3xl font-bold text-white">My Profile & Settings</h1>
                <p className="text-slate-400 mt-1">Manage your account details, security, and preferences.</p>
            </div> */}

      <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />

      <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 md:p-8">
        {activeTab === "profile" && (
          <ProfileContent
            profileData={profileData}
            setProfileData={setProfileData}
          />
        )}
        {activeTab === "security" && (
          <SecurityContent
            is2FAEnabled={is2FAEnabled}
            setIs2FAEnabled={setIs2FAEnabled}
          />
        )}
        {/* {activeTab === 'notifications' && <NotificationsContent notifications={notifications} handleNotificationChange={handleNotificationChange} />} */}
        {activeTab === "share" && <ShareContent referralLink={referCode} />}
      </div>
    </div>
  );
};
const ProfileContent = ({ profileData, setProfileData }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const userInfo = useSelector((state) => state?.isLoggedUser?.data);
  
  const handleSaveProfile = async () => {
    if (!profileData?.username?.trim()) {
      toast.error("Username is required");
      return;
    }
    if (!profileData?.email?.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!profileData?.mobile?.trim()) {
      toast.error("Mobile number is required");
      return;
    }

    console.log("📝 Starting profile update with:", profileData);
    dispatch(setLoading(true));
    try {
      const res = await updateProfile({
        username: profileData?.username?.trim(),
        email: profileData?.email?.trim(),
        mobile: profileData?.mobile?.trim(),
        country: profileData?.country?.trim()
      });
      
      console.log("📥 Update Profile Response:", res);
      
      if (res?.success) {
        toast.success(res?.message || "Profile updated successfully");
        setIsEditing(false);
        
        console.log("🔄 Refreshing user data...");
        const userRes = await getUserProfile();
        console.log("📥 Fresh user data:", userRes);
        
        if (userRes?.success) {
          dispatch(updateUserData({ data: userRes.data }));
          console.log("✅ Redux state updated");
        }
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      dispatch(setLoading(false));
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const canEdit = !userInfo?.profileEdited;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white flex items-center gap-3">
          <i className="fa-solid fa-user-edit text-blue-400"></i>Personal
          Information
        </h2>
        {canEdit && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        )}
      </div>
      <div className="flex items-center gap-6 pb-6 border-b border-slate-700/50">
        <img
          src={profileData?.picture}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-2 border-slate-600"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-slate-400 mb-2 block">Referral ID</label>
          <input
            type="text"
            value={profileData?.referralLink || ""}
            readOnly
            className="w-full bg-slate-900/80 border border-slate-700 rounded-lg py-2.5 px-3 text-slate-400 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-2 block">User Name</label>
          <input
            type="text"
            name="username"
            value={profileData?.username || ""}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full bg-slate-900/80 border border-slate-700 rounded-lg py-2.5 px-3 ${
              isEditing ? "text-white" : "text-slate-400 cursor-not-allowed"
            }`}
          />
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-2 block">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={profileData?.email || ""}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full bg-slate-900/80 border border-slate-700 rounded-lg py-2.5 px-3 ${
              isEditing ? "text-white" : "text-slate-400 cursor-not-allowed"
            }`}
          />
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-2 block">
            Country Code
          </label>
          <input
            type="text"
            name="countryCode"
            value={profileData?.countryCode || ""}
            onChange={handleInputChange}
            readOnly
            className="w-full bg-slate-900/80 border border-slate-700 rounded-lg py-2.5 px-3 text-slate-400 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-2 block">
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobile"
            value={profileData?.mobile || ""}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full bg-slate-900/80 border border-slate-700 rounded-lg py-2.5 px-3 ${
              isEditing ? "text-white" : "text-slate-400 cursor-not-allowed"
            }`}
          />
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-2 block">
            Country Name
          </label>
          <input
            type="text"
            name="country"
            value={profileData?.country || ""}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full bg-slate-900/80 border border-slate-700 rounded-lg py-2.5 px-3 ${
              isEditing ? "text-white" : "text-slate-400 cursor-not-allowed"
            }`}
          />
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-2 block">
            Wallet Address
          </label>
          <div className="relative">
            <input
              type="text"
              value={profileData?.walletAddress || ""}
              readOnly
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg py-2.5 pl-3 pr-10 text-slate-400 cursor-not-allowed"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              title="Copy Address"
            >
              <i className="fa-solid fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="pt-6 text-right border-t border-slate-700/50">
          <button 
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-500 transition-colors" 
            onClick={handleSaveProfile}
          >
            Save Changes
          </button>
        </div>
      )}
      {userInfo?.profileEdited && (
        <div className="pt-4 text-center">
          <p className="text-sm text-yellow-500">
            ⚠️ Profile has already been edited. No further changes allowed.
          </p>
        </div>
      )}
    </div>
  );
};
const SecurityContent = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-xl font-semibold text-white flex items-center gap-3">
        <i className="fa-solid fa-key text-blue-400"></i>Change Password
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="text-sm text-slate-400 mb-2 block">
            Current Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-2 block">
            New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-6 text-right pt-4 border-t border-slate-700/50">
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-500 transition-colors">
          Update Password
        </button>
      </div>
    </div>
  </div>
);
const ShareContent = ({ referralLink }) => {
  const [copyText, setCopyText] = useState("Copy");
  const qrRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopyText("Copied!");
    setTimeout(() => setCopyText("Copy"), 2000);
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = "Oxytrade-referral-qr.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-white flex items-center gap-3">
        <i className="fa-solid fa-share-alt text-blue-400"></i>Share Your
        Profile
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div ref={qrRef} className="text-center flex flex-col items-center">
          <div className="bg-white p-4 rounded-xl border-4 border-slate-700/50">
            <QRCodeCanvas value={referralLink} size={180} />
          </div>
          <button
            onClick={handleDownloadQR}
            className="mt-4 bg-slate-700/50 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <i className="fa-solid fa-download mr-2"></i>Download QR
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Your Unique Referral Link
            </label>
            <div className="relative">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg py-3 pl-3 pr-20 text-slate-300"
              />
              <button
                onClick={handleCopy}
                className={`absolute right-1 top-1/2 -translate-y-1/2 px-4 py-2 text-sm rounded-md transition-colors ${
                  copyText === "Copy"
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {copyText}
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-2 block">
              Share directly on social media
            </p>
            <div className="flex gap-4">
              <TwitterShareButton
                url={referralLink}
                title="Join me on Oxytrade!"
              >
                <i className="fab fa-twitter text-3xl text-slate-400 hover:text-sky-400 transition-colors"></i>
              </TwitterShareButton>
              <TelegramShareButton
                url={referralLink}
                title="Join me on Oxytrade!"
              >
                <i className="fab fa-telegram text-3xl text-slate-400 hover:text-sky-500 transition-colors"></i>
              </TelegramShareButton>
              <WhatsappShareButton
                url={referralLink}
                title="Join me on Oxytrade!"
              >
                <i className="fab fa-whatsapp text-3xl text-slate-400 hover:text-green-500 transition-colors"></i>
              </WhatsappShareButton>
              <button
                title="Join me on Oxytrade!"
                onClick={() => shareReferralCode(referralLink)}
              >
                <i className="fa-solid fa-ellipsis text-3xl text-slate-400 hover:text-green-500 transition-colors"></i>
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
