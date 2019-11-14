export const templatesSuccessResponse = {
  data: {
    code: 0,
    msg: 'Success',
    data: {
      records: [{
        id: 1,
        name: 'Shopee',
        ctime: '2019-06-21',
        utime: '2019-06-21',
        owner: {
          id: 1,
          username: 'Shopee',
          email: 'shopee@shopee.com',
          role: 'admin',
          team: 'BD',
          group_cat: 'Group cat 1',
          category: 'cat 1'
        },
        status_name: 'Publish',
        type_name: 'BD'
      }, {
        id: 2,
        name: 'Shopee',
        ctime: '2019-06-21',
        utime: '2019-06-21',
        owner: {
          id: 1,
          username: 'Shopee',
          email: 'shopee@shopee.com',
          role: 'admin',
          team: 'BD',
          group_cat: 'Group cat 1',
          category: 'cat 1'
        },
        status_name: 'Publish',
        type_name: 'BD'
      }],
      paging: {
        page: 1,
        pages: 1,
        total: 2
      }
    }
  }
}

export const emptySuccessResponse = {
  data: {
    code: 0,
    msg: 'Success',
    data: null
  }
}

export const templateDetailSuccessResponse = {
  data: {
    code: 0,
    msg: 'Success',
    data: {
      id: 1,
      name: 'Shopee',
      ctime: '2019-06-24',
      utime: '2019-06-24',
      owner: {
        id: 1,
        username: 'Shopee',
        email: 'shopee@shopee.com',
        role: 'admin',
        team: 'BD',
        group_cat: 'Group cat 1',
        category: 'cat 1'
      },
      content: [{
        group_id: 1,
        group_type: 'DFT',
        fields: [{
          name: 'Item ID',
          type_id: 'NBR',
          is_mandatory: true,
          for_leader: false,
          min_value: 0,
          note: ''
        }]
      }],
      type_id: 'C',
      status_id: 'P'
    }
  }
}

export const templateMetricsSuccessResponse = {
  data: {
    code: 0,
    msg: 'Success',
    data: {
      template_types: [{ id: 'C', name: 'Campaign' },
        { id: 'V', name: 'Voucher' },
        { id: 'F', name: 'Flash Sale' }
      ],
      template_groups: [{ id: 1, name: 'BD', type: 'DFT' },
        { id: 2, name: 'Product', type: 'DFT' },
        { id: 3, name: 'QC', type: 'DFT' },
        { id: 7, name: 'SYSTEM', type: 'SYS' }],
      template_system_field_names: [{ id: 'SID', name: 'Shop ID' },
        { id: 'PID', name: 'Product ID' }],
      template_status: [{ id: 'P', name: 'Publish' },
        { id: 'O', name: 'Off' }
      ]
    }
  }
}