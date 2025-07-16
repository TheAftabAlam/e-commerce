import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const CommonDialog = ({ type = 'cross', message = 'Something went wrong!', onClose }) => {
  const Icon = type === 'check' ? CheckCircleIcon : XCircleIcon;
  const iconColor = type === 'check' ? 'text-green-500' : 'text-red-500';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl px-8 py-6 text-center"
          initial={{ y: 50, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 50, scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="flex justify-center mb-4">
            <Icon className={`w-14 h-14 ${iconColor}`} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {type === 'check' ? 'Success' : 'Oops!'}
          </h2>
          <p className="text-gray-600 text-sm mb-6">{message}</p>
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition font-medium"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommonDialog;
