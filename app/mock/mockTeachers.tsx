export interface Teacher {
    id: string;
    name: {
        en: string;
        vi: string;
    };
    subject: {
        en: string;
        vi: string;
    };
    location: {
        en: string;
        vi: string;
    };
    rating: number;
    fee: {
        amount: number;
        currency: string;
        period: {
            en: string;
            vi: string;
        };
    };
    image: any;
    experience: {
        en: string;
        vi: string;
    };
    description: {
        en: string;
        vi: string;
    };
}

export const mockTeachers: Teacher[] = [
    {
        id: '1',
        name: {
            en: 'Sarah Johnson',
            vi: 'Sarah Johnson'
        },
        subject: {
            en: 'Mathematics',
            vi: 'Toán học'
        },
        location: {
            en: 'District 1, Ho Chi Minh City',
            vi: 'Quận 1, TP. Hồ Chí Minh'
        },
        rating: 4.8,
        fee: {
            amount: 500000,
            currency: 'VND',
            period: {
                en: 'per hour',
                vi: 'mỗi giờ'
            }
        },
        image: require('./placeholder.png'),
        experience: {
            en: '5 years teaching experience',
            vi: '5 năm kinh nghiệm giảng dạy'
        },
        description: {
            en: 'Specialized in Algebra and Calculus for high school students',
            vi: 'Chuyên về Đại số và Giải tích cho học sinh THPT'
        }
    },
    {
        id: '2',
        name: {
            en: 'Nguyen Van Minh',
            vi: 'Nguyễn Văn Minh'
        },
        subject: {
            en: 'English',
            vi: 'Tiếng Anh'
        },
        location: {
            en: 'District 3, Ho Chi Minh City',
            vi: 'Quận 3, TP. Hồ Chí Minh'
        },
        rating: 4.9,
        fee: {
            amount: 400000,
            currency: 'VND',
            period: {
                en: 'per hour',
                vi: 'mỗi giờ'
            }
        },
        image: require('./placeholder.png'),
        experience: {
            en: '8 years teaching experience',
            vi: '8 năm kinh nghiệm giảng dạy'
        },
        description: {
            en: 'IELTS and TOEFL preparation specialist',
            vi: 'Chuyên gia luyện thi IELTS và TOEFL'
        }
    },
    {
        id: '3',
        name: {
            en: 'Tran Thi Lan',
            vi: 'Trần Thị Lan'
        },
        subject: {
            en: 'Physics',
            vi: 'Vật lý'
        },
        location: {
            en: 'District 7, Ho Chi Minh City',
            vi: 'Quận 7, TP. Hồ Chí Minh'
        },
        rating: 4.7,
        fee: {
            amount: 450000,
            currency: 'VND',
            period: {
                en: 'per hour',
                vi: 'mỗi giờ'
            }
        },
        image: require('./placeholder.png'),
        experience: {
            en: '6 years teaching experience',
            vi: '6 năm kinh nghiệm giảng dạy'
        },
        description: {
            en: 'Expert in Mechanics and Thermodynamics',
            vi: 'Chuyên gia về Cơ học và Nhiệt động lực học'
        }
    },
    {
        id: '4',
        name: {
            en: 'David Chen',
            vi: 'David Chen'
        },
        subject: {
            en: 'Chemistry',
            vi: 'Hóa học'
        },
        location: {
            en: 'District 2, Ho Chi Minh City',
            vi: 'Quận 2, TP. Hồ Chí Minh'
        },
        rating: 4.6,
        fee: {
            amount: 480000,
            currency: 'VND',
            period: {
                en: 'per hour',
                vi: 'mỗi giờ'
            }
        },
        image: require('./placeholder.png'),
        experience: {
            en: '7 years teaching experience',
            vi: '7 năm kinh nghiệm giảng dạy'
        },
        description: {
            en: 'Specialized in Organic Chemistry and Biochemistry',
            vi: 'Chuyên về Hóa học Hữu cơ và Hóa sinh'
        }
    },
    {
        id: '5',
        name: {
            en: 'Michael Brown',
            vi: 'Michael Brown'
        },
        subject: {
            en: 'Computer Science',
            vi: 'Khoa học Máy tính'
        },
        location: {
            en: 'District 9, Ho Chi Minh City',
            vi: 'Quận 9, TP. Hồ Chí Minh'
        },
        rating: 4.9,
        fee: {
            amount: 600000,
            currency: 'VND',
            period: {
                en: 'per hour',
                vi: 'mỗi giờ'
            }
        },
        image: require('./placeholder.png'),
        experience: {
            en: '12 years teaching experience',
            vi: '12 năm kinh nghiệm giảng dạy'
        },
        description: {
            en: 'Programming and Software Development expert',
            vi: 'Chuyên gia về Lập trình và Phát triển Phần mềm'
        }
    }
];

export const subjects = [
    { value: 'all', label: { en: 'All Subjects', vi: 'Tất cả môn học' } },
    { value: 'mathematics', label: { en: 'Mathematics', vi: 'Toán học' } },
    { value: 'english', label: { en: 'English', vi: 'Tiếng Anh' } },
    { value: 'physics', label: { en: 'Physics', vi: 'Vật lý' } },
    { value: 'chemistry', label: { en: 'Chemistry', vi: 'Hóa học' } },
    { value: 'literature', label: { en: 'Literature', vi: 'Văn học' } },
    { value: 'computer-science', label: { en: 'Computer Science', vi: 'Khoa học Máy tính' } },
];
