import React, { useEffect } from "react"
import Button from "@material-ui/core/Button"
import { connect } from "react-redux"
import { User } from "../../../Redux/interfaces/user.interface"
import { UserOwnerThisPageInterface } from "../../../Redux/interfaces/userOwnerThisPage.interface"
import AvatarBlockCSS from "./AvatarBlock.module.css"

type UserAvatarProps = {
  user: User
  userOwnerThisPage: UserOwnerThisPageInterface
  homePageStatus: any
  avatarForFront: any
  handleChangeAvatar: any
  handleSubmit: any
}

const AvatarBlock: React.FC<UserAvatarProps> = ({
  user,
  userOwnerThisPage,
  homePageStatus,
  avatarForFront,
  handleChangeAvatar,
  handleSubmit
}) => {
  useEffect(() => {}, [userOwnerThisPage])
  return (
    <form
      action="submit"
      className={AvatarBlockCSS.profile__change_avatar__form}
    >
      {avatarForFront && (
        <img className="chelik" src={`${avatarForFront}`} alt="avatar" />
      )}
      {!avatarForFront && userOwnerThisPage._id && userOwnerThisPage.avatar && (
        <img
          className="chelik"
          src={`http://localhost:8080/images/users/${userOwnerThisPage._id}/${userOwnerThisPage.avatar}`}
          alt="avatar"
        />
      )}
      {!avatarForFront &&
        userOwnerThisPage._id &&
        !userOwnerThisPage.avatar && (
          <img
            className="chelik"
            src={`http://localhost:8080/images/pattern-avatar.jpg`}
            alt="avatar"
          />
        )}
      {(user.role === "admin" || homePageStatus) && (
        <>
          <Button variant="outlined" component="button">
            <label htmlFor="avatarChange">
              {" "}
              Choose avatar
              <input
                id="avatarChange"
                type="file"
                onChange={e => handleChangeAvatar(e)}
              />
            </label>
          </Button>
          <Button
            variant="outlined"
            component="button"
            onClick={(e: any) => handleSubmit(e)}
          >
            <p> Change Avatar </p>
          </Button>
        </>
      )}
    </form>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  userOwnerThisPage: state.userOwnerThisPage.userOwnerThisPage
})

export default connect(mapStateToProps)(AvatarBlock)
