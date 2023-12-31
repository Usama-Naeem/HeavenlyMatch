import React, { useState, useRef, useEffect } from 'react';
import Layout from 'antd/es/layout/layout';
import CandidateAboutMeHeader from '../../../components/CandidateAboutMeHeader/CandidateAboutMeHeader';
import { Content } from 'antd/es/layout/layout';
import { ConfigProvider, Menu, Spin, Switch, message } from 'antd';
import Dropzone from 'react-dropzone';
import { isMobileScreen } from '../../../utilities';
import { heavenlymatchUserAppSettings } from '../../../shared/api/appSettings';
import {
  deleteImageFromDynamo,
  getCandidateProfileImages,
  getCurrentUserWithCoverTrue,
  getHeavenlyMatchUser,
  getTwilioToken,
  swapObjectWithCoverTrue,
  updateUser,
  updateUserCoverImageInConversations,
  uploadCandidateProfileImages,
} from '../../../shared/api/candidates';
import { Storage } from 'aws-amplify';
import { updateHeavenlymatchUserMediaFiles } from '../../../graphql/mutations';
import { useParams } from 'react-router-dom';
import { GroupType } from '../../../enum';
import deleteIcon from '../../../shared/assets/deleteIcon.svg';

const DropdownMenu = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  useEffect(() => {
    if (props.imageIndex === props.openMenu) {
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  }, [props.imageIndex, props.openMenu]);

  const handleDropdownVisibleChange = (visible) => {
    setDropdownVisible(visible);
    props.onChange(props.imageIndex);
  };

  const deleteImage = () => {
    props.deleteHandler(props.imageIndex);
    setDropdownVisible(false);
  };

  const privateImage = (value) => {
    props.privateHandler(value);
    setDropdownVisible(false);
  };

  const makeImageCover = (item) => {
    props.coverHandler({ value: item });
    setDropdownVisible(false);
  };

  const menu = (
    <Menu
      className="w-[200px]"
      selectedKeys={selectedOption ? [selectedOption] : []}
      onClick={({ key }) => handleOptionSelect(key)}
    >
      <Menu.Item className="relative flex justify-between" key="cover">
        Make cover picture
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#CC5869',
            },
          }}
        >
          <Switch
            className="absolute right-0 top-2"
            onClick={makeImageCover}
            defaultChecked={
              props.imageIndex === 0 && props.cover ? true : false
            }
          />
        </ConfigProvider>
      </Menu.Item>
      {/* Commented this code due to future use */}
      <Menu.Item className="relative flex justify-between" key="private">
        Make picture private
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#CC5869',
            },
          }}
        >
          <Switch
            className="absolute right-0 top-2"
            onClick={privateImage}
            defaultChecked={
              props.imageId && props.imageId.private ? true : false
            }
          />
        </ConfigProvider>
      </Menu.Item>
      <Menu.Item key="delete" onClick={deleteImage}>
        <div className="flex justify-between items-center">
          <span>Delete Picture</span>
          <img src={deleteIcon} alt="" width={25} />
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={`relative ${props.width}`}>
      <span
        onClick={() => handleDropdownVisibleChange(!dropdownVisible)}
        className="cursor-pointer"
      >
        <img src="/MenuIcon.svg" alt="menuIcon" />
      </span>
      {dropdownVisible && (
        <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md z-10">
          {menu}
        </div>
      )}
    </div>
  );
};

const CandidateGallery = () => {
  const { id } = useParams();
  const [imageTypes, setImageTypes] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const dropzoneRef = useRef();
  const mobileScreen = isMobileScreen();
  const [data, setData] = useState(null);
  const [paths, setPaths] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [cover, setCover] = useState(false);
  const [imagesAllowed, setImagesAllowed] = useState(5);
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const imagesAllowed = await heavenlymatchUserAppSettings();
      setImagesAllowed(imagesAllowed?.pictureCount);
      setImageTypes(JSON.parse(imagesAllowed?.pictureExtension).join(', '));
      const imageSize = imagesAllowed?.pictureSize;
      const size =
        imageSize === 0
          ? '1'
          : imageSize === 20
          ? '2'
          : imageSize === 40
          ? '4'
          : imageSize === 60
          ? '6'
          : imageSize === 80
          ? '8'
          : '10';
      setImageSize(size * 1048576);
      // fetch latest records from db
      const userDetails = await getHeavenlyMatchUser(id);
      setData(userDetails);
      await showImages();
      setIsLoading(false);
    })();
  }, []);

  // getImages from s3 bucket using fileName
  const showImages = async () => {
    try {
      const tempPaths = [];
      // swap image with cover true at index 0
      const images = await swapObjectWithCoverTrue(id);
      const coverwithTrue = images.filter((el) => el.cover === true);
      !coverwithTrue[0] ? setCover(false) : setCover(true);
      for (const image of images) {
        if (image?.file !== null && image?.approved !== 'pending') {
          const response = await getCandidateProfileImages(image.file);
          tempPaths.push({
            s3Key: response,
            filePath: image.file,
            fileId: image.id,
            private: image.private,
          });
        }
      }
      setPaths(tempPaths);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  // Store image function
  const onDrop = async (acceptedFiles) => {
    try {
      setIsLoading(true);
      if (!imageTypes.includes(acceptedFiles[0].type.split('/')[1])) {
        message.warning(
          `Invalid image type. Only ${imageTypes} image types allowed. `,
          [4]
        );
        setIsLoading(false);
        return;
      }
      if (acceptedFiles[0].size > imageSize) {
        message.warning(
          `Invalid image size. Image size must be ${imageSize / 1048576} mb. `,
          [4]
        );
        setIsLoading(false);
        return;
      }
      const tempFiles = [...files];
      tempFiles.push(acceptedFiles[0]);
      const tempPaths = [...paths];
      tempPaths.push(URL.createObjectURL(acceptedFiles[0]));
      setFiles(tempFiles);
      setPaths(tempPaths);
      const updatedFilename = `${Date.now()}_${acceptedFiles[0].name}`;
      // store images in S3 bucket
      const s3Response = await Storage.put(updatedFilename, acceptedFiles[0]);
      // Promise.all([
      // store image key and userId in userMediaFiles in dynamo
      await uploadCandidateProfileImages(data, s3Response);
      // fetch latest records from db
      const userDetails = await getHeavenlyMatchUser(id);
      setData(userDetails);
      // run showImages function
      await showImages();
      // ]);
      setIsLoading(false);
      setOpenMenu(null);
      message.success('Image uploaded successfully', [4]);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  // Delete image function
  const deleteHandler = async (item) => {
    try {
      setIsLoading(true);
      // Promise.all([
      // remove key from s3 bucket
      await Storage.remove(item?.filePath);
      // remove id from dynamoDB
      await deleteImageFromDynamo(item);
      // fetch latest records from db
      const userDetails = await getHeavenlyMatchUser(id);
      setData(userDetails);
      // run showImages function
      await showImages();
      // ]);
      setIsLoading(false);
      setOpenMenu(null);
      message.success('Image is deleted successfully', [4]);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error.message);
    }
  };
  const privateHandler = async (item, value) => {
    try {
      setIsLoading(true);
      const updateImage = {
        id: item.fileId,
        private: value,
      };
      await updateUser(updateImage, updateHeavenlymatchUserMediaFiles);
      await showImages();
      setIsLoading(false);
      setOpenMenu(null);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error.message);
    }
  };

  // Set Cover image function
  const coverHandler = async (item, value) => {
    try {
      setIsLoading(true);
      // filter all images with cover true
      const response = await getCurrentUserWithCoverTrue(data);
      const imageId = response?.data?.id;
      // check if any image with cover true exist
      if (imageId) {
        // update presious cover image and set cover to false
        const falseDetails = {
          id: response?.data?.id,
          cover: false,
        };
        await updateUser(falseDetails, updateHeavenlymatchUserMediaFiles);
      }
      // set current cover image to true
      if (value) {
        const trueDetails = {
          id: item?.fileId,
          cover: true,
        };
        await updateUser(trueDetails, updateHeavenlymatchUserMediaFiles);
        // update cover image in twilio chat
        const response = await getCurrentUserWithCoverTrue(data);
        const newCoverImagePath = response.data.file;
        const twilioToken = await getTwilioToken(data.id);
        await updateUserCoverImageInConversations(
          twilioToken,
          newCoverImagePath,
          data.id
        );
      }
      await showImages();
      setIsLoading(false);
      setOpenMenu(null);
      message.success('Cover image is updated successfully', [4]);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error.message);
    }
  };

  const onChange = (index) => {
    setOpenMenu(index);
  };

  return (
    <Layout>
      {data !== null && <CandidateAboutMeHeader data={data} />}
      <Content className={` p-2 lg:p-10 ${mobileScreen && 'mt-5 mb-20'} `}>
        <div className="flex">
          <div
            id="candidateWork"
            className={`font-medium w-full md:h-full bg-white rounded-3xl lg:p-12 p-4 ${
              mobileScreen && 'mb-10'
            }`}
          >
            <div className="flex justify-between mb-12 xl:ml-20  ">
              <h1 className=" font-medium font-sans text-xl ">Gallery</h1>
            </div>
            <div className="flex justify-between items-center mb-12 xl:ml-20">
              <div className="hidden">
                <Dropzone
                  ref={dropzoneRef}
                  onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
              {isLoading ? (
                <Spin className="mx-auto" />
              ) : (
                <div className="flex flex-wrap">
                  <div
                    className={`flex ${
                      mobileScreen && 'flex-col items-center w-full'
                    } flex-wrap`}
                  >
                    {paths?.map((item, index) => {
                      return (
                        <div className={`rounded-lg  relative w-[180px]`}>
                          {/* Only admin can see this can edit pictures */}
                          {currentUserGroup?.includes(
                            GroupType.SUPER_ADMIN
                          ) && (
                            <div
                              className={`flex items-center absolute ${
                                mobileScreen ? 'right-[10px]' : 'right-[55px]'
                              } top-2`}
                            >
                              <DropdownMenu
                                width="w-6"
                                onChange={onChange}
                                openMenu={openMenu}
                                imageIndex={index}
                                deleteHandler={() => deleteHandler(item)}
                                coverHandler={({ value }) =>
                                  coverHandler(item, value)
                                }
                                privateHandler={(value) =>
                                  privateHandler(item, value)
                                }
                                cover={cover}
                                imageId={item}
                              />
                            </div>
                          )}
                          <img
                            key={item.s3Key}
                            src={item.s3Key}
                            alt={item.s3Key}
                            className={`object-cover ${
                              mobileScreen
                                ? 'w-[200px] h-[200px]'
                                : 'w-[135px] h-[135px]'
                            } rounded-2xl mb-10`}
                          />
                        </div>
                      );
                    })}
                    {/* Only admin can see add new picture */}
                    {currentUserGroup?.includes(GroupType.SUPER_ADMIN) &&
                      paths?.length < imagesAllowed && (
                        <div
                          className="w-[180px] "
                          onClick={() => dropzoneRef.current.open()}
                        >
                          <img
                            src="/imageUploadIcon.svg"
                            alt="uploadr"
                            className={`object-cover ${
                              mobileScreen
                                ? 'w-[200px] h-[200px]'
                                : 'w-[135px] h-[135px]'
                            } rounded-2xl mb-10`}
                          />
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CandidateGallery;
