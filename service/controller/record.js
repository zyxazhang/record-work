const db = require("../model/index");

exports.GET_RECORD_DETAIL = (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) return res.cc("未传入记录id", 200);
    const sql = "SELECT * FROM record_details where id=?";
    db.query(sql, req.query.id, (err, result) => {
      if (err) res.cc(err, 500);
      res.cc("success", 200, ...result, 1);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.CREATE_RECORD = (req, res, next) => {
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
    db.query(createStr, parmas, (err, result) => {
    //   console.log(err,result);
      if (err || result.affectedRows !== 1) return res.cc("创建失败", 200);
      req.record = {
        ...parmas,
        insertId: result.insertId,
      };
      next();
    });
  } catch (error) {}
};
exports.UPDATE_RECORD = (req, res, next) => {};
exports.DELETE_RECORD = (req, res, next) => {
  try {
    const id = req.query.id;
    const deleteStr = "DELETE FROM record_details WHERE id=?";
    db.query(deleteStr, id, (err, result) => {
      if (err) {
        return res.cc("删除失败", 500);
      }
      if (result.affectedRows === 1) {
        res.cc("删除成功", 200, { ...result }, 1);
      }
    });
  } catch (error) {}
};

exports.SET_RECORD_LIST = (req, res, next) => {
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
    db.query(insertStr, parmas, (err, result) => {
      if (err) return res.cc("设置列表失败", 500);
      res.cc("success", 200, {...result, data: {...req.record}}, 1);
    });
  } catch (err) {
    console.log(err);
  }
};
exports.GET_RECORD_LIST = (req, res, next) => {
  try {
    const queryStr = "SELECT * FROM record_list";
    db.query(queryStr, (err, result) => {
      if (err) return res.cc("获取失败", 500, err);
      res.cc("success", 200, result, 1);
    });
  } catch (err) {
    console.log(err);
  }
};
