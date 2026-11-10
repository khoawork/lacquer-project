const { sequelize, DataTypes } = require('../config/db');

const SiteSetting = sequelize.define(
  'SiteSetting',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    setting_key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    setting_value: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      get() {
        const val = this.getDataValue('setting_value');
        try {
          return val ? JSON.parse(val) : val;
        } catch {
          return val;
        }
      },
      set(val) {
        this.setDataValue(
          'setting_value',
          typeof val === 'object' ? JSON.stringify(val) : String(val)
        );
      },
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'site_settings',
    timestamps: true,
    underscored: true,
  }
);

const Menu = sequelize.define(
  'Menu',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    menu_key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    items_json: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      get() {
        const val = this.getDataValue('items_json');
        try {
          return val ? JSON.parse(val) : [];
        } catch {
          return [];
        }
      },
      set(val) {
        this.setDataValue(
          'items_json',
          typeof val === 'object' ? JSON.stringify(val) : String(val)
        );
      },
    },
  },
  {
    tableName: 'menus',
    timestamps: true,
    underscored: true,
  }
);

const FormSubmission = sequelize.define(
  'FormSubmission',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    form_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'contact',
    },
    full_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    organization: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    route_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    attachments_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    reference_code: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    admin_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('new', 'processing', 'completed', 'archived'),
      defaultValue: 'new',
    },
  },
  {
    tableName: 'form_submissions',
    timestamps: true,
    underscored: true,
  }
);

module.exports = {
  SiteSetting,
  Menu,
  FormSubmission,
};

