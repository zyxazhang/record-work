const query = require("../model/index");

exports.GET_RECORD_DETAIL = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) return res.cc("未传入记录id", 200);
    const sql = "SELECT * FROM record_details where id=?";
    const result = await query(sql, id)
    return res.cc("success", 200, ...result, 1);
  } catch (error) {
    return res.cc('获取记录失败', 200, error)
  }
};

exports.CREATE_RECORD = async (req, res, next) => {
  try {
    const { name, content, tag, desc, pictrue, author } = req.body;
    const createStr = "INSERT INTO record_details SET ?";
    const parmas = {
      name,
      content,
      tag,
      desc,
      pictrue,
      author,
      likes: 0,
      star: 0,
      create_time: new Date(),
    };
    const result = await query(createStr, parmas)
    if (result.affectedRows === 1) {
      req.record = {
        ...parmas,
        insertId: result.insertId,
      };
      next();
    }
  } catch (error) {
    return res.cc('创建记录失败', 200, error)
  }
};
exports.UPDATE_RECORD = (req, res, next) => {};
exports.DELETE_RECORD = async (req, res, next) => {
  try {
    const id = req.query.id;
    const deleteStr = "DELETE FROM record_details WHERE id=?";
    const result = await query(deleteStr, id)
    if (result.affectedRows === 1) {
      return res.cc("删除成功", 200, { ...result }, 1);
    }
  } catch (error) {
    return res.cc('删除记录失败', 200, error)
  }
};

exports.SET_RECORD_LIST = async (req, res, next) => {
  try {
    if (Object.keys(req.record).length === 0)
      return res.cc("设置列表失败", 200);
    const { name, tag, desc, pictrue, author, create_time, insertId } =
      req.record;
    const insertStr = "INSERT INTO record_list SET ?";
    const parmas = {
      name,
      create_time,
      create_by: author,
      pictrue,
      message: desc,
      tag,
      record_id: insertId,
    };
    const result = await query(insertStr, parmas)
    if (result) res.cc("success", 200, {...result, data: {...req.record}}, 1)
  } catch (error) {
    return res.cc('设置列表失败', 200, error)
  }
};
exports.GET_RECORD_LIST = async (req, res, next) => {
  try {
    const queryStr = "SELECT * FROM record_list";
    const result = await query(queryStr)
    if (result) res.cc("success", 200, result, 1);
  } catch (error) {
    return res.cc("获取失败", 200, error);
  }
};
