/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchHeavenlymatchUsers = /* GraphQL */ `
  query SearchHeavenlymatchUsers(
    $filter: SearchableHeavenlymatchUsersFilterInput
    $sort: [SearchableHeavenlymatchUsersSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableHeavenlymatchUsersAggregationInput]
  ) {
    searchHeavenlymatchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
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
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const searchHeavenlymatchUserGeneralInfos = /* GraphQL */ `
  query SearchHeavenlymatchUserGeneralInfos(
    $filter: SearchableHeavenlymatchUserGeneralInfoFilterInput
    $sort: [SearchableHeavenlymatchUserGeneralInfoSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableHeavenlymatchUserGeneralInfoAggregationInput]
  ) {
    searchHeavenlymatchUserGeneralInfos(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
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
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const searchHeavenlymatchUserLookingFors = /* GraphQL */ `
  query SearchHeavenlymatchUserLookingFors(
    $filter: SearchableHeavenlymatchUserLookingForFilterInput
    $sort: [SearchableHeavenlymatchUserLookingForSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableHeavenlymatchUserLookingForAggregationInput]
  ) {
    searchHeavenlymatchUserLookingFors(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
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
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getHeavenlymatchAdmin = /* GraphQL */ `
  query GetHeavenlymatchAdmin($id: ID!) {
    getHeavenlymatchAdmin(id: $id) {
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
export const listHeavenlymatchAdmins = /* GraphQL */ `
  query ListHeavenlymatchAdmins(
    $filter: ModelHeavenlymatchAdminFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchAdmins(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getHeavenlymatchAnnouncements = /* GraphQL */ `
  query GetHeavenlymatchAnnouncements($id: ID!) {
    getHeavenlymatchAnnouncements(id: $id) {
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
export const listHeavenlymatchAnnouncements = /* GraphQL */ `
  query ListHeavenlymatchAnnouncements(
    $filter: ModelHeavenlymatchAnnouncementsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchAnnouncements(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        adminId
        announcementsType
        announcementsFor
        announcementsText
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHeavenlymatchPaymentProcedures = /* GraphQL */ `
  query GetHeavenlymatchPaymentProcedures($id: ID!) {
    getHeavenlymatchPaymentProcedures(id: $id) {
      id
      adminId
      paymentMethod
      type
      createdAt
      updatedAt
    }
  }
`;
export const listHeavenlymatchPaymentProcedures = /* GraphQL */ `
  query ListHeavenlymatchPaymentProcedures(
    $filter: ModelHeavenlymatchPaymentProceduresFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchPaymentProcedures(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        adminId
        paymentMethod
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHeavenlymatchUsers = /* GraphQL */ `
  query GetHeavenlymatchUsers($id: ID!) {
    getHeavenlymatchUsers(id: $id) {
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
export const listHeavenlymatchUsers = /* GraphQL */ `
  query ListHeavenlymatchUsers(
    $filter: ModelHeavenlymatchUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getHeavenlymatchUserGeneralInfo = /* GraphQL */ `
  query GetHeavenlymatchUserGeneralInfo($id: ID!) {
    getHeavenlymatchUserGeneralInfo(id: $id) {
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
export const listHeavenlymatchUserGeneralInfos = /* GraphQL */ `
  query ListHeavenlymatchUserGeneralInfos(
    $filter: ModelHeavenlymatchUserGeneralInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchUserGeneralInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getHeavenlymatchUserMediaFiles = /* GraphQL */ `
  query GetHeavenlymatchUserMediaFiles($id: ID!) {
    getHeavenlymatchUserMediaFiles(id: $id) {
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
export const listHeavenlymatchUserMediaFiles = /* GraphQL */ `
  query ListHeavenlymatchUserMediaFiles(
    $filter: ModelHeavenlymatchUserMediaFilesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchUserMediaFiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getHeavenlymatchPayments = /* GraphQL */ `
  query GetHeavenlymatchPayments($id: ID!) {
    getHeavenlymatchPayments(id: $id) {
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
export const listHeavenlymatchPayments = /* GraphQL */ `
  query ListHeavenlymatchPayments(
    $filter: ModelHeavenlymatchPaymentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchPayments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        paymentType
        paymentStatus
        paymentAmount
        stripeInvoiceId
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHeavenlymatchFeedbacks = /* GraphQL */ `
  query GetHeavenlymatchFeedbacks($id: ID!) {
    getHeavenlymatchFeedbacks(id: $id) {
      id
      userId
      feedback
      type
      createdAt
      updatedAt
    }
  }
`;
export const listHeavenlymatchFeedbacks = /* GraphQL */ `
  query ListHeavenlymatchFeedbacks(
    $filter: ModelHeavenlymatchFeedbacksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchFeedbacks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getHeavenlymatchUserLookingFor = /* GraphQL */ `
  query GetHeavenlymatchUserLookingFor($id: ID!) {
    getHeavenlymatchUserLookingFor(id: $id) {
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
export const listHeavenlymatchUserLookingFors = /* GraphQL */ `
  query ListHeavenlymatchUserLookingFors(
    $filter: ModelHeavenlymatchUserLookingForFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchUserLookingFors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getHeavenlymatchMatches = /* GraphQL */ `
  query GetHeavenlymatchMatches($id: ID!) {
    getHeavenlymatchMatches(id: $id) {
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
export const listHeavenlymatchMatches = /* GraphQL */ `
  query ListHeavenlymatchMatches(
    $filter: ModelHeavenlymatchMatchesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchMatches(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        requestedFromId
        requestedToId
        status
        bookMarked
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHeavenlymatchUserReports = /* GraphQL */ `
  query GetHeavenlymatchUserReports($id: ID!) {
    getHeavenlymatchUserReports(id: $id) {
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
export const listHeavenlymatchUserReports = /* GraphQL */ `
  query ListHeavenlymatchUserReports(
    $filter: ModelHeavenlymatchUserReportsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchUserReports(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          lookingForId
          paymentId
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
          lookingForId
          paymentId
          type
          createdAt
          updatedAt
        }
        reportedReason
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHeavenlymatchHiddenProfiles = /* GraphQL */ `
  query GetHeavenlymatchHiddenProfiles($id: ID!) {
    getHeavenlymatchHiddenProfiles(id: $id) {
      id
      hiddenById
      hiddenId
      createdAt
      updatedAt
    }
  }
`;
export const listHeavenlymatchHiddenProfiles = /* GraphQL */ `
  query ListHeavenlymatchHiddenProfiles(
    $filter: ModelHeavenlymatchHiddenProfilesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchHiddenProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        hiddenById
        hiddenId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHeavenlymatchUserAppSettings = /* GraphQL */ `
  query GetHeavenlymatchUserAppSettings($id: ID!) {
    getHeavenlymatchUserAppSettings(id: $id) {
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
export const listHeavenlymatchUserAppSettings = /* GraphQL */ `
  query ListHeavenlymatchUserAppSettings(
    $filter: ModelHeavenlymatchUserAppSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchUserAppSettings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getHeavenlymatchRegisterAmmount = /* GraphQL */ `
  query GetHeavenlymatchRegisterAmmount($id: ID!) {
    getHeavenlymatchRegisterAmmount(id: $id) {
      id
      registerAmmount
      type
      createdAt
      updatedAt
    }
  }
`;
export const listHeavenlymatchRegisterAmmounts = /* GraphQL */ `
  query ListHeavenlymatchRegisterAmmounts(
    $filter: ModelHeavenlymatchRegisterAmmountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchRegisterAmmounts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        registerAmmount
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHeavenlymatchFCMToken = /* GraphQL */ `
  query GetHeavenlymatchFCMToken($id: ID!) {
    getHeavenlymatchFCMToken(id: $id) {
      id
      userId
      token
      createdAt
      updatedAt
    }
  }
`;
export const listHeavenlymatchFCMTokens = /* GraphQL */ `
  query ListHeavenlymatchFCMTokens(
    $filter: ModelHeavenlymatchFCMTokenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchFCMTokens(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        token
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHeavenlymatchNotification = /* GraphQL */ `
  query GetHeavenlymatchNotification($id: ID!) {
    getHeavenlymatchNotification(id: $id) {
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
export const listHeavenlymatchNotifications = /* GraphQL */ `
  query ListHeavenlymatchNotifications(
    $filter: ModelHeavenlymatchNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchNotifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        triggeredUser
        title
        body
        action
        userMediaFiles {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listHeavenlymatchAdminsByDate = /* GraphQL */ `
  query ListHeavenlymatchAdminsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHeavenlymatchAdminFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchAdminsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listHeavenlymatchAnnouncementsByDate = /* GraphQL */ `
  query ListHeavenlymatchAnnouncementsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHeavenlymatchAnnouncementsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchAnnouncementsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        adminId
        announcementsType
        announcementsFor
        announcementsText
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listHeavenlymatchPaymentProceduresByDate = /* GraphQL */ `
  query ListHeavenlymatchPaymentProceduresByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHeavenlymatchPaymentProceduresFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchPaymentProceduresByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        adminId
        paymentMethod
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listHeavenlymatchUsersByDate = /* GraphQL */ `
  query ListHeavenlymatchUsersByDate(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHeavenlymatchUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchUsersByDate(
      type: $type
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        userMediaFiles(filter: { cover: { eq: true } }) {
          items {
            cover
            file
            id
            accessTo
            approved
            createdAt
            replacedKey
            type
            updatedAt
            userId
          }
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
      nextToken
    }
  }
`;
export const heavenlymatchUserMediaFilesByUserIdAndCreatedAt = /* GraphQL */ `
  query HeavenlymatchUserMediaFilesByUserIdAndCreatedAt(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHeavenlymatchUserMediaFilesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    heavenlymatchUserMediaFilesByUserIdAndCreatedAt(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const listHeavenlymatchPaymentsByDate = /* GraphQL */ `
  query ListHeavenlymatchPaymentsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHeavenlymatchPaymentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchPaymentsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        paymentType
        paymentStatus
        paymentAmount
        stripeInvoiceId
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const heavenlymatchFeedbacksByUserId = /* GraphQL */ `
  query HeavenlymatchFeedbacksByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHeavenlymatchFeedbacksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    heavenlymatchFeedbacksByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const listHeavenlymatchFeedbacksByDate = /* GraphQL */ `
  query ListHeavenlymatchFeedbacksByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHeavenlymatchFeedbacksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchFeedbacksByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const listHeavenlymatchUserReportsByDate = /* GraphQL */ `
  query ListHeavenlymatchUserReportsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHeavenlymatchUserReportsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchUserReportsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          lookingForId
          paymentId
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
          lookingForId
          paymentId
          type
          createdAt
          updatedAt
        }
        reportedReason
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listHeavenlymatchRegisterAmmountByDate = /* GraphQL */ `
  query ListHeavenlymatchRegisterAmmountByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHeavenlymatchRegisterAmmountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchRegisterAmmountByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        registerAmmount
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listHeavenlymatchNotificationsByDate = /* GraphQL */ `
  query ListHeavenlymatchNotificationsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHeavenlymatchNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeavenlymatchNotificationsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        triggeredUser
        title
        body
        action
        userMediaFiles {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
