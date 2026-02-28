/* eslint-disable react/prop-types */
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import {fetchUserInfo} from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  AuthenticatedAdminRouters,
  AuthenticatedUserRouters,
  LandingRouters,
} from "../../../constants/routes";
import { MainContent } from "../../../constants/mainContent";
import { useState } from "react";
import { Sparkles } from "lucide-react";

const NavLink = ({ to, icon, text, hasNotification = false, onClose }) => {
  return (
    <RouterNavLink
      to={to}
      end={to === AuthenticatedUserRouters.DASHBOARD}
      // end={true}
      onClick={onClose}
      className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-lg relative
                transition-all duration-200 ease-in-out pointer text-sm
                ${isActive
          ? "text-white font-semibold bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 border-l-2 border-yellow-500"
          : "text-gray-300 hover:bg-black/40 hover:text-yellow-300"
        }
            `}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full" style={{
              background: 'linear-gradient(to bottom, #FFD700, #D4AF37)',
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
            }}></span>
          )}

          <i className={`${icon} w-5 text-center transition-colors`}></i>
          <span>{text}</span>

          {hasNotification && (
            <span className="ml-auto bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
              1
            </span>
          )}
        </>
      )}
    </RouterNavLink>
  );
};

const SidebarDropdown = ({
  icon,
  text,
  children,
  id,
  openDropdown,
  setOpenDropdown,
}) => {
  const isOpen = openDropdown === id;

  const toggleDropdown = () => {
    setOpenDropdown(isOpen ? null : id); // toggle
  };

  return (
    <div className="w-full">
      <button
        onClick={toggleDropdown}
        className={`
          flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm
          text-left transition-all cursor-pointer
          ${isOpen
            ? "text-white bg-gradient-to-r from-yellow-900/20 to-yellow-800/20"
            : "text-gray-300 hover:bg-black/40 hover:text-yellow-300"
          }
        `}
      >
        <span className="flex items-center gap-4">
          <i className={`${icon} w-5 text-center`}></i>
          {text}
        </span>
        <i
          className={`fa-solid fa-chevron-${isOpen ? "up" : "down"} text-xs`}
        ></i>
      </button>
      <div
        className={`pl-4 mt-2 space-y-1 transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        {children}
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(null);
  // useEffect(() => {
  //   dispatch(fetchUserInfo());
  // }, [dispatch]);
  const role = useSelector((state) => state?.isLoggedUser?.role);
  // const role = "ADMIN";
  const handleNavigate = (link) => {
    if (role === "ADMIN") {
      navigate(AuthenticatedAdminRouters.ADMIN_DASHBOARD);
    } else if (role === "USER") {
      navigate(AuthenticatedUserRouters.DASHBOARD);
    }
  };
  return (
    <aside
      className={`
                fixed inset-y-0 left-0 z-30 w-80 p-4 py-3  flex flex-col
                transform transition-transform border duration-300 ease-in-out 
                 backdrop-blur-xl 
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:relative lg:translate-x-0
            `}
      style={{
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
        borderColor: 'rgba(212, 175, 55, 0.3)'
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
      {/* <div className="absolute top-4 right-4 opacity-20">
        <Sparkles className="w-8 h-8 text-ecru" />
      </div> */}

      {/* Header */}
      <div className="flex items-center justify-center pb-2 mb-6 border-b border-delft-blue/30 relative">
        <div
          onClick={() => {
            handleNavigate();
            onClose();
          }}
          className="flex items-center gap-4  rounded-xl  cursor-pointer group hover:shadow-lg hover-gold-shadow transition-all duration-300"
        >
          <div className="relative">
            <img src={MainContent.appLogo} alt="GCC Logo" className="h-24" />
            <div className="absolute -top-1 -right-1">
            </div>
          </div>

        </div>
        {/* <button
          onClick={onClose}
          className="lg:hidden text-beaver hover:text-ecru text-2xl transition-colors duration-200 p-2 hover:bg-chamoisee/10 rounded-lg"
        >
          ×
        </button> */}
      </div>

      <nav className="flex-grow space-y-2 overflow-y-auto">
        {role === "USER" && (
          <>
            <NavLink
              to={AuthenticatedUserRouters.DASHBOARD}
              icon="fa-solid fa-table-columns"
              text="Dashboard"
              onClose={() => {
                onClose();
                setOpenDropdown(null); // close all dropdowns on link click
              }}
            />
            <SidebarDropdown
              id="my-team"
              icon="fa-solid fa-users"
              text="My Teams"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedUserRouters.MY_REFERRALS}
                icon="fa-solid fa-people-group"
                text="My Direct"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.MY_TEAM}
                icon="fa-solid fa-users"
                text="My Downline"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.MY_TEAM_DIVISION}
                icon="fa-solid fa-sitemap"
                text="My Team"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
            </SidebarDropdown>
            <NavLink
              to={AuthenticatedUserRouters.AI_TRADE}
              icon="fa-solid fa-robot"
              text="AI Trade"
              onClose={() => {
                onClose();
                setOpenDropdown(null); // close all dropdowns on link click
              }}
            />
            <SidebarDropdown
              id="manage-investment"
              icon="fa-solid fa-sack-dollar"
              text="Property Investment"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedUserRouters.INVEST}
                icon="fa-solid fa-piggy-bank"
                text="Make Investment "
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              {/* <NavLink
                to={AuthenticatedUserRouters.REINVEST}
                icon="fa-solid fa-arrows-rotate"
                text="Reinvestment"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              /> */}
              <NavLink
                to={AuthenticatedUserRouters.INVESTMENT_HISTORY}
                icon="fa-solid fa-piggy-bank"
                text="Investment History"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
            </SidebarDropdown>
            {/* <SidebarDropdown
              id="manage-roi"
              icon="fa-solid fa-robot"
              text="Manage ROI"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedUserRouters.ROI_HISTORY}
                icon="fa-solid fa-hand-holding-dollar"
                text="ROI History"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.GENERATION_ROI_HISTORY}
                icon="fa-solid fa-hand-holding-dollar"
                text="Generation ROI"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
            </SidebarDropdown> */}
            {/* <NavLink
              to={AuthenticatedUserRouters.MY_EARNING}
              icon="fa-solid fa-wallet"
              text="My Earnings"
              onClose={() => {
                onClose();
                setOpenDropdown(null); // close all dropdowns on link click
              }}
            /> */}
            <SidebarDropdown
              id="manage-deposit"
              icon="fa-solid fa-money-bill-transfer"
              text="Manage Deposit"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedUserRouters.REQUEST_DEPOSIT}
                icon="fa-solid fa-wallet"
                text="Request Deposit"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.DEPOSIT_WALLET_HISTORY}
                icon="fa-solid fa-wallet"
                text="Deposit History"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.DEPOSIT_CARD}
                icon="fa-solid fa-credit-card"
                text="Deposit Card"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              /> 
            </SidebarDropdown> 
            {/* <NavLink
              to={AuthenticatedUserRouters.INVESTMENT_REPORT}
              icon="fa-solid fa-money-bill-transfer"
              text="Investment Report"
              onClose={() => {
                onClose();
                setOpenDropdown(null); // close all dropdowns on link click
              }}
            /> */}

            {/* <SidebarDropdown
              id="manage-Fund-transfer"
              icon="fa-solid fa-money-bill-transfer"
              text="Fund Transfer"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedUserRouters.USER_FUND_TRANSFER}
                icon="fa-solid fa-circle-plus"
                text="User Fund Transfer"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.USER_FUND_TRANSFER_HISTORY}
                icon="fa-solid fa-money-bill-transfer"
                text="Fund Transfer History"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
            </SidebarDropdown> */}
            <SidebarDropdown
              id="manage-withdrawal"
              icon="fa-solid fa-money-bill-transfer"
              text="Manage Withdraw"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedUserRouters.WITHDRAW}
                icon="fa-solid fa-arrow-right-from-bracket"
                text="Withdraw"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.WITHDRAWAL_HISTORY}
                icon="fa-solid fa-money-bill-transfer"
                text="Withdrawal History"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
            </SidebarDropdown>
            {/* <SidebarDropdown
              id="income-history"
              icon="fa-solid fa-hand-holding-dollar"
              text="Income History"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedUserRouters.INCOME_HISTORY}
                icon="fa-solid fa-dollar-sign"
                text="Income History"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.TRADING_INCOME_HISTORY}
                icon="fa-solid fa-dollar-sign"
                text="Trading History"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.LEVEL_INCOME_HISTORY}
                icon="fa-solid fa-dollar-sign"
                text="Generation Income"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />

              <NavLink
                to={AuthenticatedUserRouters.LEVEL_INCOME_HISTORY}
                icon="fa-solid fa-dollar-sign"
                text="Generation Income"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.LEVEL_INCOME_HISTORY}
                icon="fa-solid fa-dollar-sign"
                text="Leadership Income"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.LEVEL_INCOME_HISTORY}
                icon="fa-solid fa-dollar-sign"
                text="Lifetime Income"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.LEVEL_INCOME_HISTORY}
                icon="fa-solid fa-dollar-sign"
                text="Mentor Income"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.LEVEL_INCOME_HISTORY}
                icon="fa-solid fa-dollar-sign"
                text="Global Income"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              
            </SidebarDropdown> */}
            <SidebarDropdown
              id="income-history"
              icon="fa-solid fa-hand-holding-dollar"
              text="Income History"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              {[
                { to: AuthenticatedUserRouters.INCOME_HISTORY, text: "Total Income History" },
                { to: AuthenticatedUserRouters.TRADING_INCOME_HISTORY, text: "Trading History" },
                { to: AuthenticatedUserRouters.DIRECT_REFERRAL_INCOME_HISTORY, text: "Direct Referral Income" },
                // { to: AuthenticatedUserRouters.LEVEL_INCOME_HISTORY, text: "Level Income" },
                { to: AuthenticatedUserRouters.GENERATION_INCOME_HISTORY, text: "Generation Income" },
                { to: AuthenticatedUserRouters.LEADERSHIP_INCOME_HISTORY, text: "Leadership Income" },
                { to: AuthenticatedUserRouters.LIFETIME_INCOME_HISTORY, text: "Lifetime Income" },
                { to: AuthenticatedUserRouters.GLOBAL_INCOME_HISTORY, text: "Global Income" },
              ].map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  icon="fa-solid fa-dollar-sign"
                  text={link.text}
                  onClose={() => {
                    onClose();
                    setOpenDropdown(null);
                  }}
                />
              ))}
            </SidebarDropdown>
            {/* <NavLink
              to={AuthenticatedUserRouters.RANK_REWARD_HISTORY}
              icon="fa-solid fa-dollar-sign"
              text="Rank Reward History"
              onClose={() => {
                onClose();
                setOpenDropdown(null); // close all dropdowns on link click
              }}
            /> */}

            <SidebarDropdown
              id="manage-support"
              icon="fa-solid fa-headset"
              text="Manage Support"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedUserRouters.RAISE_TICKET}
                icon="fa-solid fa-circle-plus"
                text="Raise Ticket"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.RAISE_TICKET_HISTORY}
                icon="fa-solid fa-circle-info"
                text="Raise Ticket History"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
            </SidebarDropdown>
            {/* <SidebarDropdown
              id="dollar-bank"
              icon="fa-solid fa-building-columns"
              text="Dollar Bank"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedUserRouters.DOLLAR_BANK}
                icon="fa-solid fa-building-columns"
                text="Dollar Bank"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null);
                }}
              />
              <NavLink
                to={AuthenticatedUserRouters.DOLLAR_BANK_INVESTMENTS}
                icon="fa-solid fa-list"
                text="My Investments"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null);
                }}
              />
            </SidebarDropdown> */}
            <NavLink
              to={AuthenticatedUserRouters.PROFILE}
              icon="fa-solid fa-user"
              text="Profile"
              onClose={() => {
                onClose();
                setOpenDropdown(null); // close all dropdowns on link click
              }}
            />
          </>
        )}

        {role === "ADMIN" && (
          <>
            <NavLink
              to={AuthenticatedAdminRouters.ADMIN_DASHBOARD}
              icon="fa-solid fa-table-columns"
              text="Dashboard"
              onClose={() => {
                onClose();
                setOpenDropdown(null); // close all dropdowns on link click
              }}
            />
            <NavLink
              to={AuthenticatedAdminRouters.ALL_USERS}
              icon="fa-solid fa-users"
              text="User Management"
              onClose={() => {
                onClose();
                setOpenDropdown(null); // close all dropdowns on link click
              }}
            />
            <NavLink
              to={AuthenticatedAdminRouters.MANAGE_PACKAGES}
              icon="fa-solid fa-trophy"
              text="Manage Properties"
              onClose={() => {
                onClose();
                setOpenDropdown(null); // close all dropdowns on link click
              }}
            />
            <NavLink
              to={AuthenticatedAdminRouters.TOTAL_TRANSACTIONS}
              icon="fa-solid fa-money-bill-transfer"
              text="Transactions"
              onClose={() => {
                onClose();
                setOpenDropdown(null); // close all dropdowns on link click
              }}
            />
            <SidebarDropdown
              id="manage-withdrawal"
              icon="fa-solid fa-money-bill-transfer"
              text="Manage Withdraw"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              {/* <NavLink
                to={AuthenticatedAdminRouters.WITHDRAWAL_REQUEST}
                icon="fa-solid fa-money-bill-transfer"
                text="Withdrawal Request"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              /> */}
              <NavLink
                to={AuthenticatedAdminRouters.APPROVED_WITHDRAWAL_REQUEST}
                icon="fa-solid fa-money-bill-transfer"
                text="Withdrawal History"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              {/* <NavLink
                to={AuthenticatedAdminRouters.REJECTED_WITHDRAWAL_REQUEST}
                icon="fa-solid fa-money-bill-transfer"
                text="Rejected Withdrawal"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              /> */}
            </SidebarDropdown>
            <SidebarDropdown
              id="manage-fund"
              icon="fa-solid fa-money-bill-transfer"
              text="Manage Fund"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedAdminRouters.ADD_FUND}
                icon="fa-solid fa-money-bill-transfer"
                text="Add Fund"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedAdminRouters.ADD_FUND_HISTORY}
                icon="fa-solid fa-money-bill-transfer"
                text="Fund History"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedAdminRouters.USER_ADD_FUND_REQUEST}
                icon="fa-solid fa-money-bill-transfer"
                text="User Fund Request"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedAdminRouters.USER_FUND_ACCEPTED}
                icon="fa-solid fa-money-bill-transfer"
                text="Accepted User Fund"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedAdminRouters.USER_FUND_REJECTED}
                icon="fa-solid fa-money-bill-transfer"
                text="Rejected User Fund"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
            </SidebarDropdown>

            <SidebarDropdown
              id="income-history"
              icon="fa-solid fa-hand-holding-dollar"
              text="Income History"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedAdminRouters.INCOME_HISTORY}
                icon="fa-solid fa-dollar-sign"
                text="Income History"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              {/* Referral Income - REMOVED AS NOT USED */}
              <NavLink
                to={AuthenticatedAdminRouters.LEVEL_INCOME_HISTORY}
                icon="fa-solid fa-dollar-sign"
                text="Generation Income"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              {/* <NavLink
                to={AuthenticatedAdminRouters.MATCHING_INCOME_HISTORY}
                icon="fa-solid fa-dollar-sign"
                text="Matching Income"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedAdminRouters.TRADING_LIST}
                icon="fa-solid fa-arrow-trend-up"
                text="Trading List"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              /> */}
            </SidebarDropdown>

            <SidebarDropdown
              id="manage-rankandreward"
              icon="fa-solid fa-sack-dollar"
              text="Rank & Reward"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedAdminRouters.MANAGE_RANK_AND_REWARD}
                icon="fa-solid fa-dollar-sign"
                text="Rank & Reward"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedAdminRouters.RANK_REWARD_HISTORY}
                icon="fa-solid fa-sack-dollar"
                text="Rank Reward History"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
            </SidebarDropdown>
            {/* <SidebarDropdown
              id="global-achievers"
              icon="fa-solid fa-money-bill-transfer"
              text="Global Achievers"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedAdminRouters.MANAGE_GLOBAL_ACHIEVERS_CLUB}
                icon="fa-solid fa-sack-dollar"
                text="Achievers Club"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedAdminRouters.GLOBAL_ACHIEVERS}
                icon="fa-solid fa-trophy"
                text="Achievers history"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
            </SidebarDropdown> */}
            <SidebarDropdown
              id="manage-support"
              icon="fa-solid fa-headset"
              text="Support"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedAdminRouters.PENDING_TICKETS}
                icon="fa-solid fa-circle-info"
                text="Pending Tickets"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
              <NavLink
                to={AuthenticatedAdminRouters.CLOSED_TICKETS}
                icon="fa-solid fa-circle-info"
                text="Closed Tickets"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null); // close all dropdowns on link click
                }}
              />
            </SidebarDropdown>
            {/* <SidebarDropdown
              id="dollar-bank"
              icon="fa-solid fa-building-columns"
              text="Dollar Bank"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <NavLink
                to={AuthenticatedAdminRouters.DOLLAR_BANK}
                icon="fa-solid fa-building-columns"
                text="Dollar Bank Summary"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null);
                }}
              />
              <NavLink
                to={AuthenticatedAdminRouters.DOLLAR_BANK_WITHDRAWAL_REQUESTS}
                icon="fa-solid fa-money-bill-transfer"
                text="Withdrawal Requests"
                onClose={() => {
                  onClose();
                  setOpenDropdown(null);
                }}
              />
            </SidebarDropdown> */}
            <NavLink
              to={AuthenticatedAdminRouters.CHANGE_PASSWORD}
              icon="fa-solid fa-lock"
              text="Change Password"
              onClose={() => {
                onClose();
                setOpenDropdown(null); // close all dropdowns on link click
              }}
            />
          </>
        )}
        {/* <NavLink
          to={AuthenticatedUserRouters.MARKET}
          icon="fa-solid fa-chart-line"
          text="Market Chart"
        /> */}
      </nav>

      <div className="pt-2 mt-2 border-t border-delft-blue/30">
        <div className="">
          <a
            href="#"
            className="flex items-center gap-4 px-4 py-2.5 rounded-lg text-beaver hover:bg-space-cadet-2/40 hover:text-ecru transition-all"
          >
            <i className="fa-solid fa-dollar-sign w-5 text-center"></i> USD
          </a>
          <a
            href="#"
            className="flex items-center gap-4 px-4 py-2.5 rounded-lg text-beaver hover:bg-space-cadet-2/40 hover:text-ecru transition-all"
          >
            <i className="fa-solid fa-flag-usa w-5 text-center"></i> English
          </a>
        </div>
        <div className="flex justify-center gap-6 text-beaver">
          <a href="#" className="hover:text-ecru transition-colors text-lg">
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a href="#" className="hover:text-ecru transition-colors text-lg">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-ecru transition-colors text-lg">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;