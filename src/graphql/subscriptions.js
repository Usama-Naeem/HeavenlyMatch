/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateHeavenlymatchAdmin = /* GraphQL */ `
  subscription OnCreateHeavenlymatchAdmin(
    $filter: ModelSubscriptionHeavenlymatchAdminFilterInput
  ) {
    onCreateHeavenlymatchAdmin(filter: $filter) {
      id
      firstName
      lastName
      email
      username
      role
      receiveEmails
      status
      isArchive
      phoneNumber
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchAdmin = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchAdmin(
    $filter: ModelSubscriptionHeavenlymatchAdminFilterInput
  ) {
    onUpdateHeavenlymatchAdmin(filter: $filter) {
      id
      firstName
      lastName
      email
      username
      role
      receiveEmails
      status
      isArchive
      phoneNumber
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchAdmin = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchAdmin(
    $filter: ModelSubscriptionHeavenlymatchAdminFilterInput
  ) {
    onDeleteHeavenlymatchAdmin(filter: $filter) {
      id
      firstName
      lastName
      email
      username
      role
      receiveEmails
      status
      isArchive
      phoneNumber
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchAnnouncements = /* GraphQL */ `
  subscription OnCreateHeavenlymatchAnnouncements(
    $filter: ModelSubscriptionHeavenlymatchAnnouncementsFilterInput
  ) {
    onCreateHeavenlymatchAnnouncements(filter: $filter) {
      id
      adminId
      announcementsType
      announcementsFor
      announcementsText
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchAnnouncements = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchAnnouncements(
    $filter: ModelSubscriptionHeavenlymatchAnnouncementsFilterInput
  ) {
    onUpdateHeavenlymatchAnnouncements(filter: $filter) {
      id
      adminId
      announcementsType
      announcementsFor
      announcementsText
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchAnnouncements = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchAnnouncements(
    $filter: ModelSubscriptionHeavenlymatchAnnouncementsFilterInput
  ) {
    onDeleteHeavenlymatchAnnouncements(filter: $filter) {
      id
      adminId
      announcementsType
      announcementsFor
      announcementsText
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchPaymentProcedures = /* GraphQL */ `
  subscription OnCreateHeavenlymatchPaymentProcedures(
    $filter: ModelSubscriptionHeavenlymatchPaymentProceduresFilterInput
  ) {
    onCreateHeavenlymatchPaymentProcedures(filter: $filter) {
      id
      adminId
      paymentMethod
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchPaymentProcedures = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchPaymentProcedures(
    $filter: ModelSubscriptionHeavenlymatchPaymentProceduresFilterInput
  ) {
    onUpdateHeavenlymatchPaymentProcedures(filter: $filter) {
      id
      adminId
      paymentMethod
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchPaymentProcedures = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchPaymentProcedures(
    $filter: ModelSubscriptionHeavenlymatchPaymentProceduresFilterInput
  ) {
    onDeleteHeavenlymatchPaymentProcedures(filter: $filter) {
      id
      adminId
      paymentMethod
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchUsers = /* GraphQL */ `
  subscription OnCreateHeavenlymatchUsers(
    $filter: ModelSubscriptionHeavenlymatchUsersFilterInput
  ) {
    onCreateHeavenlymatchUsers(filter: $filter) {
      id
      firstName
      lastName
      middleName
      username
      displayName
      email
      birthday
      gender
      isPaid
      status
      isArchive
      paymentExclusion
      phoneNumber
      stripeCustomerId
      education
      currentDegree
      expectedCompletionDateDegree
      fieldOfStudy
      schoolName
      currentlyWorking
      occupation
      companyName
      designation
      requireTravel
      travelForWork
      brothersCount
      sistersCount
      syed
      haveSiblings
      motherName
      fatherName
      livingWith
      haveDependents
      noDependent
      relocate
      maritalStatus
      sect
      pray
      gotoMosque
      hijabBeard
      hajj
      hangoutFriends
      doCooking
      watchingTv
      playVideoGames
      exercise
      smoking
      drinking
      consumeHalal
      personality
      sports
      movies
      adrenalineJunkie
      isModalShown
      userOldBio
      userNewBio
      bioApproved
      imagesApproved
      isNewProfile
      newProfileApproved
      moderationType
      imageModerationType
      bioModerationType
      isReported
      generalInfoId
      userGeneralInfo {
        id
        phoneContact
        height
        ethnicity
        residenceCountry
        birthCountry
        state
        city
        visaStatus
        createdAt
        updatedAt
      }
      userMediaFiles {
        items {
          id
          userId
          file
          type
          cover
          private
          accessTo
          replacedKey
          approved
          createdAt
          updatedAt
        }
        nextToken
      }
      userFeedbacks {
        items {
          id
          userId
          feedback
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      lookingForId
      userLookingFor {
        id
        age
        ethnicity
        education
        hijabBeard
        consumeHalal
        drinking
        pray
        createdAt
        updatedAt
      }
      paymentId
      userPayments {
        id
        paymentType
        paymentStatus
        paymentAmount
        stripeInvoiceId
        type
        createdAt
        updatedAt
      }
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchUsers = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchUsers(
    $filter: ModelSubscriptionHeavenlymatchUsersFilterInput
  ) {
    onUpdateHeavenlymatchUsers(filter: $filter) {
      id
      firstName
      lastName
      middleName
      username
      displayName
      email
      birthday
      gender
      isPaid
      status
      isArchive
      paymentExclusion
      phoneNumber
      stripeCustomerId
      education
      currentDegree
      expectedCompletionDateDegree
      fieldOfStudy
      schoolName
      currentlyWorking
      occupation
      companyName
      designation
      requireTravel
      travelForWork
      brothersCount
      sistersCount
      syed
      haveSiblings
      motherName
      fatherName
      livingWith
      haveDependents
      noDependent
      relocate
      maritalStatus
      sect
      pray
      gotoMosque
      hijabBeard
      hajj
      hangoutFriends
      doCooking
      watchingTv
      playVideoGames
      exercise
      smoking
      drinking
      consumeHalal
      personality
      sports
      movies
      adrenalineJunkie
      isModalShown
      userOldBio
      userNewBio
      bioApproved
      imagesApproved
      isNewProfile
      newProfileApproved
      moderationType
      imageModerationType
      bioModerationType
      isReported
      generalInfoId
      userGeneralInfo {
        id
        phoneContact
        height
        ethnicity
        residenceCountry
        birthCountry
        state
        city
        visaStatus
        createdAt
        updatedAt
      }
      userMediaFiles {
        items {
          id
          userId
          file
          type
          cover
          private
          accessTo
          replacedKey
          approved
          createdAt
          updatedAt
        }
        nextToken
      }
      userFeedbacks {
        items {
          id
          userId
          feedback
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      lookingForId
      userLookingFor {
        id
        age
        ethnicity
        education
        hijabBeard
        consumeHalal
        drinking
        pray
        createdAt
        updatedAt
      }
      paymentId
      userPayments {
        id
        paymentType
        paymentStatus
        paymentAmount
        stripeInvoiceId
        type
        createdAt
        updatedAt
      }
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchUsers = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchUsers(
    $filter: ModelSubscriptionHeavenlymatchUsersFilterInput
  ) {
    onDeleteHeavenlymatchUsers(filter: $filter) {
      id
      firstName
      lastName
      middleName
      username
      displayName
      email
      birthday
      gender
      isPaid
      status
      isArchive
      paymentExclusion
      phoneNumber
      stripeCustomerId
      education
      currentDegree
      expectedCompletionDateDegree
      fieldOfStudy
      schoolName
      currentlyWorking
      occupation
      companyName
      designation
      requireTravel
      travelForWork
      brothersCount
      sistersCount
      syed
      haveSiblings
      motherName
      fatherName
      livingWith
      haveDependents
      noDependent
      relocate
      maritalStatus
      sect
      pray
      gotoMosque
      hijabBeard
      hajj
      hangoutFriends
      doCooking
      watchingTv
      playVideoGames
      exercise
      smoking
      drinking
      consumeHalal
      personality
      sports
      movies
      adrenalineJunkie
      isModalShown
      userOldBio
      userNewBio
      bioApproved
      imagesApproved
      isNewProfile
      newProfileApproved
      moderationType
      imageModerationType
      bioModerationType
      isReported
      generalInfoId
      userGeneralInfo {
        id
        phoneContact
        height
        ethnicity
        residenceCountry
        birthCountry
        state
        city
        visaStatus
        createdAt
        updatedAt
      }
      userMediaFiles {
        items {
          id
          userId
          file
          type
          cover
          private
          accessTo
          replacedKey
          approved
          createdAt
          updatedAt
        }
        nextToken
      }
      userFeedbacks {
        items {
          id
          userId
          feedback
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      lookingForId
      userLookingFor {
        id
        age
        ethnicity
        education
        hijabBeard
        consumeHalal
        drinking
        pray
        createdAt
        updatedAt
      }
      paymentId
      userPayments {
        id
        paymentType
        paymentStatus
        paymentAmount
        stripeInvoiceId
        type
        createdAt
        updatedAt
      }
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchUserGeneralInfo = /* GraphQL */ `
  subscription OnCreateHeavenlymatchUserGeneralInfo(
    $filter: ModelSubscriptionHeavenlymatchUserGeneralInfoFilterInput
  ) {
    onCreateHeavenlymatchUserGeneralInfo(filter: $filter) {
      id
      phoneContact
      height
      ethnicity
      residenceCountry
      birthCountry
      state
      city
      visaStatus
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchUserGeneralInfo = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchUserGeneralInfo(
    $filter: ModelSubscriptionHeavenlymatchUserGeneralInfoFilterInput
  ) {
    onUpdateHeavenlymatchUserGeneralInfo(filter: $filter) {
      id
      phoneContact
      height
      ethnicity
      residenceCountry
      birthCountry
      state
      city
      visaStatus
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchUserGeneralInfo = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchUserGeneralInfo(
    $filter: ModelSubscriptionHeavenlymatchUserGeneralInfoFilterInput
  ) {
    onDeleteHeavenlymatchUserGeneralInfo(filter: $filter) {
      id
      phoneContact
      height
      ethnicity
      residenceCountry
      birthCountry
      state
      city
      visaStatus
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchUserMediaFiles = /* GraphQL */ `
  subscription OnCreateHeavenlymatchUserMediaFiles(
    $filter: ModelSubscriptionHeavenlymatchUserMediaFilesFilterInput
  ) {
    onCreateHeavenlymatchUserMediaFiles(filter: $filter) {
      id
      userId
      file
      type
      cover
      private
      accessTo
      replacedKey
      approved
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchUserMediaFiles = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchUserMediaFiles(
    $filter: ModelSubscriptionHeavenlymatchUserMediaFilesFilterInput
  ) {
    onUpdateHeavenlymatchUserMediaFiles(filter: $filter) {
      id
      userId
      file
      type
      cover
      private
      accessTo
      replacedKey
      approved
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchUserMediaFiles = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchUserMediaFiles(
    $filter: ModelSubscriptionHeavenlymatchUserMediaFilesFilterInput
  ) {
    onDeleteHeavenlymatchUserMediaFiles(filter: $filter) {
      id
      userId
      file
      type
      cover
      private
      accessTo
      replacedKey
      approved
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchPayments = /* GraphQL */ `
  subscription OnCreateHeavenlymatchPayments(
    $filter: ModelSubscriptionHeavenlymatchPaymentsFilterInput
  ) {
    onCreateHeavenlymatchPayments(filter: $filter) {
      id
      paymentType
      paymentStatus
      paymentAmount
      stripeInvoiceId
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchPayments = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchPayments(
    $filter: ModelSubscriptionHeavenlymatchPaymentsFilterInput
  ) {
    onUpdateHeavenlymatchPayments(filter: $filter) {
      id
      paymentType
      paymentStatus
      paymentAmount
      stripeInvoiceId
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchPayments = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchPayments(
    $filter: ModelSubscriptionHeavenlymatchPaymentsFilterInput
  ) {
    onDeleteHeavenlymatchPayments(filter: $filter) {
      id
      paymentType
      paymentStatus
      paymentAmount
      stripeInvoiceId
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchFeedbacks = /* GraphQL */ `
  subscription OnCreateHeavenlymatchFeedbacks(
    $filter: ModelSubscriptionHeavenlymatchFeedbacksFilterInput
  ) {
    onCreateHeavenlymatchFeedbacks(filter: $filter) {
      id
      userId
      feedback
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchFeedbacks = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchFeedbacks(
    $filter: ModelSubscriptionHeavenlymatchFeedbacksFilterInput
  ) {
    onUpdateHeavenlymatchFeedbacks(filter: $filter) {
      id
      userId
      feedback
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchFeedbacks = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchFeedbacks(
    $filter: ModelSubscriptionHeavenlymatchFeedbacksFilterInput
  ) {
    onDeleteHeavenlymatchFeedbacks(filter: $filter) {
      id
      userId
      feedback
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchUserLookingFor = /* GraphQL */ `
  subscription OnCreateHeavenlymatchUserLookingFor(
    $filter: ModelSubscriptionHeavenlymatchUserLookingForFilterInput
  ) {
    onCreateHeavenlymatchUserLookingFor(filter: $filter) {
      id
      age
      ethnicity
      education
      hijabBeard
      consumeHalal
      drinking
      pray
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchUserLookingFor = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchUserLookingFor(
    $filter: ModelSubscriptionHeavenlymatchUserLookingForFilterInput
  ) {
    onUpdateHeavenlymatchUserLookingFor(filter: $filter) {
      id
      age
      ethnicity
      education
      hijabBeard
      consumeHalal
      drinking
      pray
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchUserLookingFor = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchUserLookingFor(
    $filter: ModelSubscriptionHeavenlymatchUserLookingForFilterInput
  ) {
    onDeleteHeavenlymatchUserLookingFor(filter: $filter) {
      id
      age
      ethnicity
      education
      hijabBeard
      consumeHalal
      drinking
      pray
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchMatches = /* GraphQL */ `
  subscription OnCreateHeavenlymatchMatches(
    $filter: ModelSubscriptionHeavenlymatchMatchesFilterInput
  ) {
    onCreateHeavenlymatchMatches(filter: $filter) {
      id
      requestedFromId
      requestedToId
      status
      bookMarked
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchMatches = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchMatches(
    $filter: ModelSubscriptionHeavenlymatchMatchesFilterInput
  ) {
    onUpdateHeavenlymatchMatches(filter: $filter) {
      id
      requestedFromId
      requestedToId
      status
      bookMarked
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchMatches = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchMatches(
    $filter: ModelSubscriptionHeavenlymatchMatchesFilterInput
  ) {
    onDeleteHeavenlymatchMatches(filter: $filter) {
      id
      requestedFromId
      requestedToId
      status
      bookMarked
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchUserReports = /* GraphQL */ `
  subscription OnCreateHeavenlymatchUserReports(
    $filter: ModelSubscriptionHeavenlymatchUserReportsFilterInput
  ) {
    onCreateHeavenlymatchUserReports(filter: $filter) {
      id
      reportedUserId
      reportedUser {
        id
        firstName
        lastName
        middleName
        username
        displayName
        email
        birthday
        gender
        isPaid
        status
        isArchive
        paymentExclusion
        phoneNumber
        stripeCustomerId
        education
        currentDegree
        expectedCompletionDateDegree
        fieldOfStudy
        schoolName
        currentlyWorking
        occupation
        companyName
        designation
        requireTravel
        travelForWork
        brothersCount
        sistersCount
        syed
        haveSiblings
        motherName
        fatherName
        livingWith
        haveDependents
        noDependent
        relocate
        maritalStatus
        sect
        pray
        gotoMosque
        hijabBeard
        hajj
        hangoutFriends
        doCooking
        watchingTv
        playVideoGames
        exercise
        smoking
        drinking
        consumeHalal
        personality
        sports
        movies
        adrenalineJunkie
        isModalShown
        userOldBio
        userNewBio
        bioApproved
        imagesApproved
        isNewProfile
        newProfileApproved
        moderationType
        imageModerationType
        bioModerationType
        isReported
        generalInfoId
        userGeneralInfo {
          id
          phoneContact
          height
          ethnicity
          residenceCountry
          birthCountry
          state
          city
          visaStatus
          createdAt
          updatedAt
        }
        userMediaFiles {
          nextToken
        }
        userFeedbacks {
          nextToken
        }
        lookingForId
        userLookingFor {
          id
          age
          ethnicity
          education
          hijabBeard
          consumeHalal
          drinking
          pray
          createdAt
          updatedAt
        }
        paymentId
        userPayments {
          id
          paymentType
          paymentStatus
          paymentAmount
          stripeInvoiceId
          type
          createdAt
          updatedAt
        }
        type
        createdAt
        updatedAt
      }
      reportedByUserId
      reportedByUser {
        id
        firstName
        lastName
        middleName
        username
        displayName
        email
        birthday
        gender
        isPaid
        status
        isArchive
        paymentExclusion
        phoneNumber
        stripeCustomerId
        education
        currentDegree
        expectedCompletionDateDegree
        fieldOfStudy
        schoolName
        currentlyWorking
        occupation
        companyName
        designation
        requireTravel
        travelForWork
        brothersCount
        sistersCount
        syed
        haveSiblings
        motherName
        fatherName
        livingWith
        haveDependents
        noDependent
        relocate
        maritalStatus
        sect
        pray
        gotoMosque
        hijabBeard
        hajj
        hangoutFriends
        doCooking
        watchingTv
        playVideoGames
        exercise
        smoking
        drinking
        consumeHalal
        personality
        sports
        movies
        adrenalineJunkie
        isModalShown
        userOldBio
        userNewBio
        bioApproved
        imagesApproved
        isNewProfile
        newProfileApproved
        moderationType
        imageModerationType
        bioModerationType
        isReported
        generalInfoId
        userGeneralInfo {
          id
          phoneContact
          height
          ethnicity
          residenceCountry
          birthCountry
          state
          city
          visaStatus
          createdAt
          updatedAt
        }
        userMediaFiles {
          nextToken
        }
        userFeedbacks {
          nextToken
        }
        lookingForId
        userLookingFor {
          id
          age
          ethnicity
          education
          hijabBeard
          consumeHalal
          drinking
          pray
          createdAt
          updatedAt
        }
        paymentId
        userPayments {
          id
          paymentType
          paymentStatus
          paymentAmount
          stripeInvoiceId
          type
          createdAt
          updatedAt
        }
        type
        createdAt
        updatedAt
      }
      reportedReason
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchUserReports = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchUserReports(
    $filter: ModelSubscriptionHeavenlymatchUserReportsFilterInput
  ) {
    onUpdateHeavenlymatchUserReports(filter: $filter) {
      id
      reportedUserId
      reportedUser {
        id
        firstName
        lastName
        middleName
        username
        displayName
        email
        birthday
        gender
        isPaid
        status
        isArchive
        paymentExclusion
        phoneNumber
        stripeCustomerId
        education
        currentDegree
        expectedCompletionDateDegree
        fieldOfStudy
        schoolName
        currentlyWorking
        occupation
        companyName
        designation
        requireTravel
        travelForWork
        brothersCount
        sistersCount
        syed
        haveSiblings
        motherName
        fatherName
        livingWith
        haveDependents
        noDependent
        relocate
        maritalStatus
        sect
        pray
        gotoMosque
        hijabBeard
        hajj
        hangoutFriends
        doCooking
        watchingTv
        playVideoGames
        exercise
        smoking
        drinking
        consumeHalal
        personality
        sports
        movies
        adrenalineJunkie
        isModalShown
        userOldBio
        userNewBio
        bioApproved
        imagesApproved
        isNewProfile
        newProfileApproved
        moderationType
        imageModerationType
        bioModerationType
        isReported
        generalInfoId
        userGeneralInfo {
          id
          phoneContact
          height
          ethnicity
          residenceCountry
          birthCountry
          state
          city
          visaStatus
          createdAt
          updatedAt
        }
        userMediaFiles {
          nextToken
        }
        userFeedbacks {
          nextToken
        }
        lookingForId
        userLookingFor {
          id
          age
          ethnicity
          education
          hijabBeard
          consumeHalal
          drinking
          pray
          createdAt
          updatedAt
        }
        paymentId
        userPayments {
          id
          paymentType
          paymentStatus
          paymentAmount
          stripeInvoiceId
          type
          createdAt
          updatedAt
        }
        type
        createdAt
        updatedAt
      }
      reportedByUserId
      reportedByUser {
        id
        firstName
        lastName
        middleName
        username
        displayName
        email
        birthday
        gender
        isPaid
        status
        isArchive
        paymentExclusion
        phoneNumber
        stripeCustomerId
        education
        currentDegree
        expectedCompletionDateDegree
        fieldOfStudy
        schoolName
        currentlyWorking
        occupation
        companyName
        designation
        requireTravel
        travelForWork
        brothersCount
        sistersCount
        syed
        haveSiblings
        motherName
        fatherName
        livingWith
        haveDependents
        noDependent
        relocate
        maritalStatus
        sect
        pray
        gotoMosque
        hijabBeard
        hajj
        hangoutFriends
        doCooking
        watchingTv
        playVideoGames
        exercise
        smoking
        drinking
        consumeHalal
        personality
        sports
        movies
        adrenalineJunkie
        isModalShown
        userOldBio
        userNewBio
        bioApproved
        imagesApproved
        isNewProfile
        newProfileApproved
        moderationType
        imageModerationType
        bioModerationType
        isReported
        generalInfoId
        userGeneralInfo {
          id
          phoneContact
          height
          ethnicity
          residenceCountry
          birthCountry
          state
          city
          visaStatus
          createdAt
          updatedAt
        }
        userMediaFiles {
          nextToken
        }
        userFeedbacks {
          nextToken
        }
        lookingForId
        userLookingFor {
          id
          age
          ethnicity
          education
          hijabBeard
          consumeHalal
          drinking
          pray
          createdAt
          updatedAt
        }
        paymentId
        userPayments {
          id
          paymentType
          paymentStatus
          paymentAmount
          stripeInvoiceId
          type
          createdAt
          updatedAt
        }
        type
        createdAt
        updatedAt
      }
      reportedReason
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchUserReports = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchUserReports(
    $filter: ModelSubscriptionHeavenlymatchUserReportsFilterInput
  ) {
    onDeleteHeavenlymatchUserReports(filter: $filter) {
      id
      reportedUserId
      reportedUser {
        id
        firstName
        lastName
        middleName
        username
        displayName
        email
        birthday
        gender
        isPaid
        status
        isArchive
        paymentExclusion
        phoneNumber
        stripeCustomerId
        education
        currentDegree
        expectedCompletionDateDegree
        fieldOfStudy
        schoolName
        currentlyWorking
        occupation
        companyName
        designation
        requireTravel
        travelForWork
        brothersCount
        sistersCount
        syed
        haveSiblings
        motherName
        fatherName
        livingWith
        haveDependents
        noDependent
        relocate
        maritalStatus
        sect
        pray
        gotoMosque
        hijabBeard
        hajj
        hangoutFriends
        doCooking
        watchingTv
        playVideoGames
        exercise
        smoking
        drinking
        consumeHalal
        personality
        sports
        movies
        adrenalineJunkie
        isModalShown
        userOldBio
        userNewBio
        bioApproved
        imagesApproved
        isNewProfile
        newProfileApproved
        moderationType
        imageModerationType
        bioModerationType
        isReported
        generalInfoId
        userGeneralInfo {
          id
          phoneContact
          height
          ethnicity
          residenceCountry
          birthCountry
          state
          city
          visaStatus
          createdAt
          updatedAt
        }
        userMediaFiles {
          nextToken
        }
        userFeedbacks {
          nextToken
        }
        lookingForId
        userLookingFor {
          id
          age
          ethnicity
          education
          hijabBeard
          consumeHalal
          drinking
          pray
          createdAt
          updatedAt
        }
        paymentId
        userPayments {
          id
          paymentType
          paymentStatus
          paymentAmount
          stripeInvoiceId
          type
          createdAt
          updatedAt
        }
        type
        createdAt
        updatedAt
      }
      reportedByUserId
      reportedByUser {
        id
        firstName
        lastName
        middleName
        username
        displayName
        email
        birthday
        gender
        isPaid
        status
        isArchive
        paymentExclusion
        phoneNumber
        stripeCustomerId
        education
        currentDegree
        expectedCompletionDateDegree
        fieldOfStudy
        schoolName
        currentlyWorking
        occupation
        companyName
        designation
        requireTravel
        travelForWork
        brothersCount
        sistersCount
        syed
        haveSiblings
        motherName
        fatherName
        livingWith
        haveDependents
        noDependent
        relocate
        maritalStatus
        sect
        pray
        gotoMosque
        hijabBeard
        hajj
        hangoutFriends
        doCooking
        watchingTv
        playVideoGames
        exercise
        smoking
        drinking
        consumeHalal
        personality
        sports
        movies
        adrenalineJunkie
        isModalShown
        userOldBio
        userNewBio
        bioApproved
        imagesApproved
        isNewProfile
        newProfileApproved
        moderationType
        imageModerationType
        bioModerationType
        isReported
        generalInfoId
        userGeneralInfo {
          id
          phoneContact
          height
          ethnicity
          residenceCountry
          birthCountry
          state
          city
          visaStatus
          createdAt
          updatedAt
        }
        userMediaFiles {
          nextToken
        }
        userFeedbacks {
          nextToken
        }
        lookingForId
        userLookingFor {
          id
          age
          ethnicity
          education
          hijabBeard
          consumeHalal
          drinking
          pray
          createdAt
          updatedAt
        }
        paymentId
        userPayments {
          id
          paymentType
          paymentStatus
          paymentAmount
          stripeInvoiceId
          type
          createdAt
          updatedAt
        }
        type
        createdAt
        updatedAt
      }
      reportedReason
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchHiddenProfiles = /* GraphQL */ `
  subscription OnCreateHeavenlymatchHiddenProfiles(
    $filter: ModelSubscriptionHeavenlymatchHiddenProfilesFilterInput
  ) {
    onCreateHeavenlymatchHiddenProfiles(filter: $filter) {
      id
      hiddenById
      hiddenId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchHiddenProfiles = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchHiddenProfiles(
    $filter: ModelSubscriptionHeavenlymatchHiddenProfilesFilterInput
  ) {
    onUpdateHeavenlymatchHiddenProfiles(filter: $filter) {
      id
      hiddenById
      hiddenId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchHiddenProfiles = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchHiddenProfiles(
    $filter: ModelSubscriptionHeavenlymatchHiddenProfilesFilterInput
  ) {
    onDeleteHeavenlymatchHiddenProfiles(filter: $filter) {
      id
      hiddenById
      hiddenId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchUserAppSettings = /* GraphQL */ `
  subscription OnCreateHeavenlymatchUserAppSettings(
    $filter: ModelSubscriptionHeavenlymatchUserAppSettingsFilterInput
  ) {
    onCreateHeavenlymatchUserAppSettings(filter: $filter) {
      id
      minAge
      maxAge
      pictureCount
      pictureSize
      pictureExtension
      intrests
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchUserAppSettings = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchUserAppSettings(
    $filter: ModelSubscriptionHeavenlymatchUserAppSettingsFilterInput
  ) {
    onUpdateHeavenlymatchUserAppSettings(filter: $filter) {
      id
      minAge
      maxAge
      pictureCount
      pictureSize
      pictureExtension
      intrests
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchUserAppSettings = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchUserAppSettings(
    $filter: ModelSubscriptionHeavenlymatchUserAppSettingsFilterInput
  ) {
    onDeleteHeavenlymatchUserAppSettings(filter: $filter) {
      id
      minAge
      maxAge
      pictureCount
      pictureSize
      pictureExtension
      intrests
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchRegisterAmmount = /* GraphQL */ `
  subscription OnCreateHeavenlymatchRegisterAmmount(
    $filter: ModelSubscriptionHeavenlymatchRegisterAmmountFilterInput
  ) {
    onCreateHeavenlymatchRegisterAmmount(filter: $filter) {
      id
      registerAmmount
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchRegisterAmmount = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchRegisterAmmount(
    $filter: ModelSubscriptionHeavenlymatchRegisterAmmountFilterInput
  ) {
    onUpdateHeavenlymatchRegisterAmmount(filter: $filter) {
      id
      registerAmmount
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchRegisterAmmount = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchRegisterAmmount(
    $filter: ModelSubscriptionHeavenlymatchRegisterAmmountFilterInput
  ) {
    onDeleteHeavenlymatchRegisterAmmount(filter: $filter) {
      id
      registerAmmount
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchFCMToken = /* GraphQL */ `
  subscription OnCreateHeavenlymatchFCMToken(
    $filter: ModelSubscriptionHeavenlymatchFCMTokenFilterInput
  ) {
    onCreateHeavenlymatchFCMToken(filter: $filter) {
      id
      userId
      token
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchFCMToken = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchFCMToken(
    $filter: ModelSubscriptionHeavenlymatchFCMTokenFilterInput
  ) {
    onUpdateHeavenlymatchFCMToken(filter: $filter) {
      id
      userId
      token
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchFCMToken = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchFCMToken(
    $filter: ModelSubscriptionHeavenlymatchFCMTokenFilterInput
  ) {
    onDeleteHeavenlymatchFCMToken(filter: $filter) {
      id
      userId
      token
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeavenlymatchNotification = /* GraphQL */ `
  subscription OnCreateHeavenlymatchNotification(
    $filter: ModelSubscriptionHeavenlymatchNotificationFilterInput
  ) {
    onCreateHeavenlymatchNotification(filter: $filter) {
      id
      userId
      triggeredUser
      title
      body
      action
      userMediaFiles {
        items {
          id
          userId
          file
          type
          cover
          private
          accessTo
          replacedKey
          approved
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeavenlymatchNotification = /* GraphQL */ `
  subscription OnUpdateHeavenlymatchNotification(
    $filter: ModelSubscriptionHeavenlymatchNotificationFilterInput
  ) {
    onUpdateHeavenlymatchNotification(filter: $filter) {
      id
      userId
      triggeredUser
      title
      body
      action
      userMediaFiles {
        items {
          id
          userId
          file
          type
          cover
          private
          accessTo
          replacedKey
          approved
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeavenlymatchNotification = /* GraphQL */ `
  subscription OnDeleteHeavenlymatchNotification(
    $filter: ModelSubscriptionHeavenlymatchNotificationFilterInput
  ) {
    onDeleteHeavenlymatchNotification(filter: $filter) {
      id
      userId
      triggeredUser
      title
      body
      action
      userMediaFiles {
        items {
          id
          userId
          file
          type
          cover
          private
          accessTo
          replacedKey
          approved
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      createdAt
      updatedAt
    }
  }
`;
