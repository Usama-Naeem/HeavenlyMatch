/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHeavenlymatchAdmin = /* GraphQL */ `
  mutation CreateHeavenlymatchAdmin(
    $input: CreateHeavenlymatchAdminInput!
    $condition: ModelHeavenlymatchAdminConditionInput
  ) {
    createHeavenlymatchAdmin(input: $input, condition: $condition) {
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
export const updateHeavenlymatchAdmin = /* GraphQL */ `
  mutation UpdateHeavenlymatchAdmin(
    $input: UpdateHeavenlymatchAdminInput!
    $condition: ModelHeavenlymatchAdminConditionInput
  ) {
    updateHeavenlymatchAdmin(input: $input, condition: $condition) {
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
export const deleteHeavenlymatchAdmin = /* GraphQL */ `
  mutation DeleteHeavenlymatchAdmin(
    $input: DeleteHeavenlymatchAdminInput!
    $condition: ModelHeavenlymatchAdminConditionInput
  ) {
    deleteHeavenlymatchAdmin(input: $input, condition: $condition) {
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
export const createHeavenlymatchAnnouncements = /* GraphQL */ `
  mutation CreateHeavenlymatchAnnouncements(
    $input: CreateHeavenlymatchAnnouncementsInput!
    $condition: ModelHeavenlymatchAnnouncementsConditionInput
  ) {
    createHeavenlymatchAnnouncements(input: $input, condition: $condition) {
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
export const updateHeavenlymatchAnnouncements = /* GraphQL */ `
  mutation UpdateHeavenlymatchAnnouncements(
    $input: UpdateHeavenlymatchAnnouncementsInput!
    $condition: ModelHeavenlymatchAnnouncementsConditionInput
  ) {
    updateHeavenlymatchAnnouncements(input: $input, condition: $condition) {
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
export const deleteHeavenlymatchAnnouncements = /* GraphQL */ `
  mutation DeleteHeavenlymatchAnnouncements(
    $input: DeleteHeavenlymatchAnnouncementsInput!
    $condition: ModelHeavenlymatchAnnouncementsConditionInput
  ) {
    deleteHeavenlymatchAnnouncements(input: $input, condition: $condition) {
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
export const createHeavenlymatchPaymentProcedures = /* GraphQL */ `
  mutation CreateHeavenlymatchPaymentProcedures(
    $input: CreateHeavenlymatchPaymentProceduresInput!
    $condition: ModelHeavenlymatchPaymentProceduresConditionInput
  ) {
    createHeavenlymatchPaymentProcedures(input: $input, condition: $condition) {
      id
      adminId
      paymentMethod
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateHeavenlymatchPaymentProcedures = /* GraphQL */ `
  mutation UpdateHeavenlymatchPaymentProcedures(
    $input: UpdateHeavenlymatchPaymentProceduresInput!
    $condition: ModelHeavenlymatchPaymentProceduresConditionInput
  ) {
    updateHeavenlymatchPaymentProcedures(input: $input, condition: $condition) {
      id
      adminId
      paymentMethod
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteHeavenlymatchPaymentProcedures = /* GraphQL */ `
  mutation DeleteHeavenlymatchPaymentProcedures(
    $input: DeleteHeavenlymatchPaymentProceduresInput!
    $condition: ModelHeavenlymatchPaymentProceduresConditionInput
  ) {
    deleteHeavenlymatchPaymentProcedures(input: $input, condition: $condition) {
      id
      adminId
      paymentMethod
      type
      createdAt
      updatedAt
    }
  }
`;
export const createHeavenlymatchUsers = /* GraphQL */ `
  mutation CreateHeavenlymatchUsers(
    $input: CreateHeavenlymatchUsersInput!
    $condition: ModelHeavenlymatchUsersConditionInput
  ) {
    createHeavenlymatchUsers(input: $input, condition: $condition) {
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
export const updateHeavenlymatchUsers = /* GraphQL */ `
  mutation UpdateHeavenlymatchUsers(
    $input: UpdateHeavenlymatchUsersInput!
    $condition: ModelHeavenlymatchUsersConditionInput
  ) {
    updateHeavenlymatchUsers(input: $input, condition: $condition) {
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
export const deleteHeavenlymatchUsers = /* GraphQL */ `
  mutation DeleteHeavenlymatchUsers(
    $input: DeleteHeavenlymatchUsersInput!
    $condition: ModelHeavenlymatchUsersConditionInput
  ) {
    deleteHeavenlymatchUsers(input: $input, condition: $condition) {
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
export const createHeavenlymatchUserGeneralInfo = /* GraphQL */ `
  mutation CreateHeavenlymatchUserGeneralInfo(
    $input: CreateHeavenlymatchUserGeneralInfoInput!
    $condition: ModelHeavenlymatchUserGeneralInfoConditionInput
  ) {
    createHeavenlymatchUserGeneralInfo(input: $input, condition: $condition) {
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
export const updateHeavenlymatchUserGeneralInfo = /* GraphQL */ `
  mutation UpdateHeavenlymatchUserGeneralInfo(
    $input: UpdateHeavenlymatchUserGeneralInfoInput!
    $condition: ModelHeavenlymatchUserGeneralInfoConditionInput
  ) {
    updateHeavenlymatchUserGeneralInfo(input: $input, condition: $condition) {
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
export const deleteHeavenlymatchUserGeneralInfo = /* GraphQL */ `
  mutation DeleteHeavenlymatchUserGeneralInfo(
    $input: DeleteHeavenlymatchUserGeneralInfoInput!
    $condition: ModelHeavenlymatchUserGeneralInfoConditionInput
  ) {
    deleteHeavenlymatchUserGeneralInfo(input: $input, condition: $condition) {
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
export const createHeavenlymatchUserMediaFiles = /* GraphQL */ `
  mutation CreateHeavenlymatchUserMediaFiles(
    $input: CreateHeavenlymatchUserMediaFilesInput!
    $condition: ModelHeavenlymatchUserMediaFilesConditionInput
  ) {
    createHeavenlymatchUserMediaFiles(input: $input, condition: $condition) {
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
export const updateHeavenlymatchUserMediaFiles = /* GraphQL */ `
  mutation UpdateHeavenlymatchUserMediaFiles(
    $input: UpdateHeavenlymatchUserMediaFilesInput!
    $condition: ModelHeavenlymatchUserMediaFilesConditionInput
  ) {
    updateHeavenlymatchUserMediaFiles(input: $input, condition: $condition) {
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
export const deleteHeavenlymatchUserMediaFiles = /* GraphQL */ `
  mutation DeleteHeavenlymatchUserMediaFiles(
    $input: DeleteHeavenlymatchUserMediaFilesInput!
    $condition: ModelHeavenlymatchUserMediaFilesConditionInput
  ) {
    deleteHeavenlymatchUserMediaFiles(input: $input, condition: $condition) {
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
export const createHeavenlymatchPayments = /* GraphQL */ `
  mutation CreateHeavenlymatchPayments(
    $input: CreateHeavenlymatchPaymentsInput!
    $condition: ModelHeavenlymatchPaymentsConditionInput
  ) {
    createHeavenlymatchPayments(input: $input, condition: $condition) {
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
export const updateHeavenlymatchPayments = /* GraphQL */ `
  mutation UpdateHeavenlymatchPayments(
    $input: UpdateHeavenlymatchPaymentsInput!
    $condition: ModelHeavenlymatchPaymentsConditionInput
  ) {
    updateHeavenlymatchPayments(input: $input, condition: $condition) {
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
export const deleteHeavenlymatchPayments = /* GraphQL */ `
  mutation DeleteHeavenlymatchPayments(
    $input: DeleteHeavenlymatchPaymentsInput!
    $condition: ModelHeavenlymatchPaymentsConditionInput
  ) {
    deleteHeavenlymatchPayments(input: $input, condition: $condition) {
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
export const createHeavenlymatchFeedbacks = /* GraphQL */ `
  mutation CreateHeavenlymatchFeedbacks(
    $input: CreateHeavenlymatchFeedbacksInput!
    $condition: ModelHeavenlymatchFeedbacksConditionInput
  ) {
    createHeavenlymatchFeedbacks(input: $input, condition: $condition) {
      id
      userId
      feedback
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateHeavenlymatchFeedbacks = /* GraphQL */ `
  mutation UpdateHeavenlymatchFeedbacks(
    $input: UpdateHeavenlymatchFeedbacksInput!
    $condition: ModelHeavenlymatchFeedbacksConditionInput
  ) {
    updateHeavenlymatchFeedbacks(input: $input, condition: $condition) {
      id
      userId
      feedback
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteHeavenlymatchFeedbacks = /* GraphQL */ `
  mutation DeleteHeavenlymatchFeedbacks(
    $input: DeleteHeavenlymatchFeedbacksInput!
    $condition: ModelHeavenlymatchFeedbacksConditionInput
  ) {
    deleteHeavenlymatchFeedbacks(input: $input, condition: $condition) {
      id
      userId
      feedback
      type
      createdAt
      updatedAt
    }
  }
`;
export const createHeavenlymatchUserLookingFor = /* GraphQL */ `
  mutation CreateHeavenlymatchUserLookingFor(
    $input: CreateHeavenlymatchUserLookingForInput!
    $condition: ModelHeavenlymatchUserLookingForConditionInput
  ) {
    createHeavenlymatchUserLookingFor(input: $input, condition: $condition) {
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
export const updateHeavenlymatchUserLookingFor = /* GraphQL */ `
  mutation UpdateHeavenlymatchUserLookingFor(
    $input: UpdateHeavenlymatchUserLookingForInput!
    $condition: ModelHeavenlymatchUserLookingForConditionInput
  ) {
    updateHeavenlymatchUserLookingFor(input: $input, condition: $condition) {
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
export const deleteHeavenlymatchUserLookingFor = /* GraphQL */ `
  mutation DeleteHeavenlymatchUserLookingFor(
    $input: DeleteHeavenlymatchUserLookingForInput!
    $condition: ModelHeavenlymatchUserLookingForConditionInput
  ) {
    deleteHeavenlymatchUserLookingFor(input: $input, condition: $condition) {
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
export const createHeavenlymatchMatches = /* GraphQL */ `
  mutation CreateHeavenlymatchMatches(
    $input: CreateHeavenlymatchMatchesInput!
    $condition: ModelHeavenlymatchMatchesConditionInput
  ) {
    createHeavenlymatchMatches(input: $input, condition: $condition) {
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
export const updateHeavenlymatchMatches = /* GraphQL */ `
  mutation UpdateHeavenlymatchMatches(
    $input: UpdateHeavenlymatchMatchesInput!
    $condition: ModelHeavenlymatchMatchesConditionInput
  ) {
    updateHeavenlymatchMatches(input: $input, condition: $condition) {
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
export const deleteHeavenlymatchMatches = /* GraphQL */ `
  mutation DeleteHeavenlymatchMatches(
    $input: DeleteHeavenlymatchMatchesInput!
    $condition: ModelHeavenlymatchMatchesConditionInput
  ) {
    deleteHeavenlymatchMatches(input: $input, condition: $condition) {
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
export const createHeavenlymatchUserReports = /* GraphQL */ `
  mutation CreateHeavenlymatchUserReports(
    $input: CreateHeavenlymatchUserReportsInput!
    $condition: ModelHeavenlymatchUserReportsConditionInput
  ) {
    createHeavenlymatchUserReports(input: $input, condition: $condition) {
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
export const updateHeavenlymatchUserReports = /* GraphQL */ `
  mutation UpdateHeavenlymatchUserReports(
    $input: UpdateHeavenlymatchUserReportsInput!
    $condition: ModelHeavenlymatchUserReportsConditionInput
  ) {
    updateHeavenlymatchUserReports(input: $input, condition: $condition) {
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
export const deleteHeavenlymatchUserReports = /* GraphQL */ `
  mutation DeleteHeavenlymatchUserReports(
    $input: DeleteHeavenlymatchUserReportsInput!
    $condition: ModelHeavenlymatchUserReportsConditionInput
  ) {
    deleteHeavenlymatchUserReports(input: $input, condition: $condition) {
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
export const createHeavenlymatchHiddenProfiles = /* GraphQL */ `
  mutation CreateHeavenlymatchHiddenProfiles(
    $input: CreateHeavenlymatchHiddenProfilesInput!
    $condition: ModelHeavenlymatchHiddenProfilesConditionInput
  ) {
    createHeavenlymatchHiddenProfiles(input: $input, condition: $condition) {
      id
      hiddenById
      hiddenId
      createdAt
      updatedAt
    }
  }
`;
export const updateHeavenlymatchHiddenProfiles = /* GraphQL */ `
  mutation UpdateHeavenlymatchHiddenProfiles(
    $input: UpdateHeavenlymatchHiddenProfilesInput!
    $condition: ModelHeavenlymatchHiddenProfilesConditionInput
  ) {
    updateHeavenlymatchHiddenProfiles(input: $input, condition: $condition) {
      id
      hiddenById
      hiddenId
      createdAt
      updatedAt
    }
  }
`;
export const deleteHeavenlymatchHiddenProfiles = /* GraphQL */ `
  mutation DeleteHeavenlymatchHiddenProfiles(
    $input: DeleteHeavenlymatchHiddenProfilesInput!
    $condition: ModelHeavenlymatchHiddenProfilesConditionInput
  ) {
    deleteHeavenlymatchHiddenProfiles(input: $input, condition: $condition) {
      id
      hiddenById
      hiddenId
      createdAt
      updatedAt
    }
  }
`;
export const createHeavenlymatchUserAppSettings = /* GraphQL */ `
  mutation CreateHeavenlymatchUserAppSettings(
    $input: CreateHeavenlymatchUserAppSettingsInput!
    $condition: ModelHeavenlymatchUserAppSettingsConditionInput
  ) {
    createHeavenlymatchUserAppSettings(input: $input, condition: $condition) {
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
export const updateHeavenlymatchUserAppSettings = /* GraphQL */ `
  mutation UpdateHeavenlymatchUserAppSettings(
    $input: UpdateHeavenlymatchUserAppSettingsInput!
    $condition: ModelHeavenlymatchUserAppSettingsConditionInput
  ) {
    updateHeavenlymatchUserAppSettings(input: $input, condition: $condition) {
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
export const deleteHeavenlymatchUserAppSettings = /* GraphQL */ `
  mutation DeleteHeavenlymatchUserAppSettings(
    $input: DeleteHeavenlymatchUserAppSettingsInput!
    $condition: ModelHeavenlymatchUserAppSettingsConditionInput
  ) {
    deleteHeavenlymatchUserAppSettings(input: $input, condition: $condition) {
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
export const createHeavenlymatchRegisterAmmount = /* GraphQL */ `
  mutation CreateHeavenlymatchRegisterAmmount(
    $input: CreateHeavenlymatchRegisterAmmountInput!
    $condition: ModelHeavenlymatchRegisterAmmountConditionInput
  ) {
    createHeavenlymatchRegisterAmmount(input: $input, condition: $condition) {
      id
      registerAmmount
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateHeavenlymatchRegisterAmmount = /* GraphQL */ `
  mutation UpdateHeavenlymatchRegisterAmmount(
    $input: UpdateHeavenlymatchRegisterAmmountInput!
    $condition: ModelHeavenlymatchRegisterAmmountConditionInput
  ) {
    updateHeavenlymatchRegisterAmmount(input: $input, condition: $condition) {
      id
      registerAmmount
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteHeavenlymatchRegisterAmmount = /* GraphQL */ `
  mutation DeleteHeavenlymatchRegisterAmmount(
    $input: DeleteHeavenlymatchRegisterAmmountInput!
    $condition: ModelHeavenlymatchRegisterAmmountConditionInput
  ) {
    deleteHeavenlymatchRegisterAmmount(input: $input, condition: $condition) {
      id
      registerAmmount
      type
      createdAt
      updatedAt
    }
  }
`;
export const createHeavenlymatchFCMToken = /* GraphQL */ `
  mutation CreateHeavenlymatchFCMToken(
    $input: CreateHeavenlymatchFCMTokenInput!
    $condition: ModelHeavenlymatchFCMTokenConditionInput
  ) {
    createHeavenlymatchFCMToken(input: $input, condition: $condition) {
      id
      userId
      token
      createdAt
      updatedAt
    }
  }
`;
export const updateHeavenlymatchFCMToken = /* GraphQL */ `
  mutation UpdateHeavenlymatchFCMToken(
    $input: UpdateHeavenlymatchFCMTokenInput!
    $condition: ModelHeavenlymatchFCMTokenConditionInput
  ) {
    updateHeavenlymatchFCMToken(input: $input, condition: $condition) {
      id
      userId
      token
      createdAt
      updatedAt
    }
  }
`;
export const deleteHeavenlymatchFCMToken = /* GraphQL */ `
  mutation DeleteHeavenlymatchFCMToken(
    $input: DeleteHeavenlymatchFCMTokenInput!
    $condition: ModelHeavenlymatchFCMTokenConditionInput
  ) {
    deleteHeavenlymatchFCMToken(input: $input, condition: $condition) {
      id
      userId
      token
      createdAt
      updatedAt
    }
  }
`;
export const createHeavenlymatchNotification = /* GraphQL */ `
  mutation CreateHeavenlymatchNotification(
    $input: CreateHeavenlymatchNotificationInput!
    $condition: ModelHeavenlymatchNotificationConditionInput
  ) {
    createHeavenlymatchNotification(input: $input, condition: $condition) {
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
export const updateHeavenlymatchNotification = /* GraphQL */ `
  mutation UpdateHeavenlymatchNotification(
    $input: UpdateHeavenlymatchNotificationInput!
    $condition: ModelHeavenlymatchNotificationConditionInput
  ) {
    updateHeavenlymatchNotification(input: $input, condition: $condition) {
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
export const deleteHeavenlymatchNotification = /* GraphQL */ `
  mutation DeleteHeavenlymatchNotification(
    $input: DeleteHeavenlymatchNotificationInput!
    $condition: ModelHeavenlymatchNotificationConditionInput
  ) {
    deleteHeavenlymatchNotification(input: $input, condition: $condition) {
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
