import { Button, message } from 'antd';
import FormModal from '../../shared/components/FormModal/FormModal';
import { Input, Tag, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './InviteCandidateModal.css';
import {
  ADD_ATLEAST_ONE_EMAIL,
  INVALID_EMAIL_ADDRESS,
  INVITATION_SENT,
  emailRegex,
} from '../../utilities';
import { sendInviteCandidateEmailTemplate } from '../../shared/api/email';
import { EmailTemplates } from '../../shared/enum/email';

function InviteCandidateModal({ isModalOpen, setIsModalOpen, title }) {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    const isValidEmail = emailRegex.test(inputValue);
    if (!inputValue) {
      return;
    }

    if (!isValidEmail && inputValue) {
      message.warning(INVALID_EMAIL_ADDRESS, [3]);
      return;
    }

    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputValue('');
  };

  const tagInputStyle = {
    width: 78,
    verticalAlign: 'top',
  };

  const handleFormSubmit = async () => {
    try {
      if (tags.length < 1) {
        message.error(ADD_ATLEAST_ONE_EMAIL, [3]);
        return;
      }
      setIsLoading(true);
      await sendInviteCandidateEmailTemplate(
        tags,
        EmailTemplates.INVITE_CANDIDATE_EMAIL
      );
      message.success(INVITATION_SENT, [2]);
      setIsLoading(false);
      setIsModalOpen(false);
      setTags([]);
    } catch (error) {
      setIsLoading(false);
      setIsModalOpen(false);
      throw new Error(error.message);
    }
  };

  return (
    <FormModal
      title={title}
      setIsModalOpen={setIsModalOpen}
      isModalOpen={isModalOpen}
      width={370}
    >
      <div className="pt-[20px]">
        <Input
          ref={inputRef}
          type="email"
          size="large"
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          placeholder="Enter email addresses to invite users"
          className="!w-[300px] mb-3"
        />
        {tags.map((tag) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              key={tag}
              closable={true}
              style={{
                userSelect: 'none',
              }}
              onClose={() => handleClose(tag)}
            >
              <span>{isLongTag ? `${tag.slice(0, 20)}...` : tag}</span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      </div>
      <div id="candidateInvite">
        <Button
          loading={isLoading}
        className="w-full text-white bg-lightburgundy mt-[20px] h-[45px] font-normal rounded-full text-base no-underline"
          onClick={handleFormSubmit}
          htmlType="submit"
          disabled={inputValue ? true : false}
        >
          Send Invite
        </Button>
      </div>
    </FormModal>
  );
}

export default InviteCandidateModal;
