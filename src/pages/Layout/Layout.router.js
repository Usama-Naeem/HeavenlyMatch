import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CandidateManagement from './CandidateManagement/CandidateManagement';
import TeamManagement from './TeamManagement/TeamManagement';
import CandidateAboutMe from './CandidateAboutMe/CandidateAboutMe';
import CandidateWork from './CandidateWork/CandidateWork';
import CandididateFamily from './CandidateFamily/CandidateFamily';
import CandidateEducation from './CandidateEducation/CandidateEducation';
import CandidateMaritalStatus from './CandidateMaritalStatus/CandidateMaritalStatus';
import CandidateLiving from './CandidateLiving/CandidateLiving';
import CandidateRelegion from './CandidateRelegion/CandidateRelegion';
import CandidateLifeStyle from './CandidateLifeStyle/CandidateLifeStyle';
import CandidatePersonalityAndInterests from './CandidatePersonalityAndInterests/CandidatePersonalityAndInterests';
import CandidateLookingFor from './CandidateLookingFor/CandidateLookingFor';
import CandidatePayment from './CandidatePayment/CandidatePayment';
import CandidateGallery from './CandidateGallery/CandidateGallery';
import CandidateMatches from './CandidateMatches/CandidateMatches';
import Announcements from './Announcement/Announcements';
import AppSettings from './AppSettings/AppSettings';
import MyProfile from './MyProfile/MyProfile';
import Payments from './Payments/Payments';
import { GroupType } from '../../enum';
import Page403 from '../Page403/Page403';

const LayoutRouter = () => {
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  return (
    <Routes>
      {currentUserGroup?.includes(GroupType.SUPER_ADMIN) && (
        <>
          <Route path="team-management" element={<TeamManagement />} />
          <Route
            path="candidate-management"
            element={<CandidateManagement />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-about-me/:id"
            element={<CandidateAboutMe />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-work/:id"
            element={<CandidateWork />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-family/:id"
            element={<CandididateFamily />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-education/:id"
            element={<CandidateEducation />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-marital-status/:id"
            element={<CandidateMaritalStatus />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-living/:id"
            element={<CandidateLiving />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-religion/:id"
            element={<CandidateRelegion />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-life-style/:id"
            element={<CandidateLifeStyle />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-personality-interests/:id"
            element={<CandidatePersonalityAndInterests />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-looking-for/:id"
            element={<CandidateLookingFor />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-payment/:id"
            element={<CandidatePayment />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-gallery/:id"
            element={<CandidateGallery />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-matches/:id"
            element={<CandidateMatches />}
          />
          <Route path="announcement" element={<Announcements />} />
          <Route path="app-settings" element={<AppSettings />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="payments" element={<Payments />} />
        </>
      )}
      {currentUserGroup?.includes(GroupType.VOLUNTEER) && (
        <>
          <Route
            path="candidate-management"
            element={<CandidateManagement />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-about-me/:id"
            element={<CandidateAboutMe />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-work/:id"
            element={<CandidateWork />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-family/:id"
            element={<CandididateFamily />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-education/:id"
            element={<CandidateEducation />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-marital-status/:id"
            element={<CandidateMaritalStatus />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-living/:id"
            element={<CandidateLiving />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-religion/:id"
            element={<CandidateRelegion />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-life-style/:id"
            element={<CandidateLifeStyle />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-personality-interests/:id"
            element={<CandidatePersonalityAndInterests />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-looking-for/:id"
            element={<CandidateLookingFor />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-payment/:id"
            element={<CandidatePayment />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-gallery/:id"
            element={<CandidateGallery />}
          />
          <Route
            path="candidate-management/candidate-details/candidate-matches/:id"
            element={<CandidateMatches />}
          />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="team-management" element={<Page403 />} />
          <Route path="announcement" element={<Page403 />} />
          <Route path="app-settings" element={<Page403 />} />
          <Route path="payments" element={<Page403 />} />
        </>
      )}
    </Routes>
  );
};

export default LayoutRouter;
