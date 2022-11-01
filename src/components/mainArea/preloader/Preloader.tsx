import s from 'components/mainArea/preloader/Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.preloader} />
    </div>
  );
};

export default Preloader;
