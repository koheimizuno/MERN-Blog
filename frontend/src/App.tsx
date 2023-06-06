import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";

import AuthService from "./services/auth.service";
import IUser from "./types/user.type";

import Login from "./components/login.component";
import Register from "./components/register.component";
import MyPage from "./components/mypage.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import EventBus from "./common/EventBus";
import { CreateBlog } from "./components/createblog.component";
import Dashboard from "./components/dashboard.component";
import { UpdateBlog } from "./components/updateblog.component";
import { DetailBlog } from "./components/detailblog.component";

type Props = {};

type State = {
  showModeratorBoard: boolean;
  showAdminBoard: boolean;
  currentUser: IUser | undefined;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="w-full bg-gray-800 text-white p-4">
          <div className="flex justify-between px-4 container">
            <div className="flex items-center">
              <Link to={"/"} className="text-xl font-bold text-white">
                Dashboard
              </Link>
            </div>

            {currentUser ? (
              <div className="flex justify-between px-4">
                <div className="flex items-center mr-5">
                  <Link to={"/mypage"} className="text-xl font-bold text-white">
                    {currentUser.username}
                  </Link>
                </div>
                <div className="flex items-center">
                  <a
                    href="/login"
                    className="text-xl font-bold text-white"
                    onClick={this.logOut}
                  >
                    LogOut
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex justify-between px-4">
                <div className="flex items-center mr-5">
                  <Link to={"/login"} className="text-xl font-bold text-white">
                    Login
                  </Link>
                </div>

                <div className="flex items-center">
                  <Link
                    to={"/register"}
                    className="text-xl font-bold text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/update/:id" element={<UpdateBlog />} />
            <Route path="/detail/" element={<DetailBlog />} />
          </Routes>
        </div>

        {/*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
