import React, { useState, useContext } from "react";
import { Card } from "../../UserProfile.component.styled";
import { UserContext } from "../../../../Context/UserContext";
import { FormStyled } from "../../UserProfile.component.styled";
import { StyledButton } from "../../UserProfile.component.styled";
import * as UserProfileService from "../../services/UserProfile.service";
import PersonalInfo from "./sessions/PersonalInfo.component";
import SocialRegister from "./sessions/SocialsRegister.component";
import UserSkills from "./sessions/UserSkills.component";
import { Row, Notification } from "../../../../antd_components";
import { TIPO_CADASTRO } from "../../../../Helpers/TipoCadastro";

const UserInfoTab = ({ darkPallete, user, token, viewMode }) => {
  const [editMode, setEditMode] = useState(false);
  const { setUser } = useContext(UserContext);

  const styleInput = {
    color: "gray",
    marginTop: "-1px",
    border: viewMode && "none",
    borderBottom: viewMode && "solid 1px rgba(0, 0, 0, 0.1)",
  };

  function handleSubmit(values) {
    const {
      username,
      email,
      cpf,
      phone,
      celphone,
      biography,
      facebook,
      instagram,
      twitter,
      linkedin,
      github,
    } = values;

    const dto = {
      username,
      email,
      cpf,
      phone: phone || null,
      celphone: celphone || null,
      biography: biography || null,
      socials: {
        facebook: facebook || null,
        instagram: instagram || null,
        twitter: twitter || null,
        linkedin: linkedin || null,
        github: github || null,
      },
    };

    UserProfileService.UpdateUserInfo(dto, token).then(({ data }) => {
      const { message, status, updatedUser } = data;

      setUser(updatedUser);

      Notification.open({
        type: status === 200 ? "success" : "error",
        message,
      });

      setEditMode(false);
    });
  }

  return (
    <Card bordered={false}>
      {user && (
        <FormStyled
          background={darkPallete.white}
          onFinish={handleSubmit}
          layout='vertical'
          initialValues={{
            username: user.username,
            email: user.email,
            cpf: user?.cpf,
            phone: user?.phone,
            celphone: user?.celphone,
            biography: user.biography,
            facebook: user?.socials?.facebook,
            instagram: user?.socials?.instagram,
            twitter: user?.socials?.twitter,
            linkedin: user?.socials?.linkedin,
            github: user?.socials?.github,
          }}
        >
          <PersonalInfo
            editMode={editMode}
            viewMode={viewMode}
            styleInput={styleInput}
            darkPallete={darkPallete}
            setEditMode={(value) => setEditMode(value)}
          />

          {user?.accountType === TIPO_CADASTRO.FREELANCER && (
            <UserSkills
              editMode={editMode}
              viewMode={viewMode}
              styleInput={styleInput}
              darkPallete={darkPallete}
            />
          )}

          {!viewMode && (
            <SocialRegister editMode={editMode} styleInput={styleInput} />
          )}

          {editMode && (
            <Row justify='end'>
              <StyledButton
                htmlType='submit'
                backgroundcolor={darkPallete.lightblue}
                height='35'
                width='200'
                color={darkPallete.white}
              >
                Confirmar
              </StyledButton>
            </Row>
          )}
        </FormStyled>
      )}
    </Card>
  );
};

export default UserInfoTab;
