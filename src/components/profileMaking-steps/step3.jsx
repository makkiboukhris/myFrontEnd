import React from 'react'
import Checkbox from "@material-ui/core/Checkbox";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import AddBoxIcon from "@material-ui/icons/AddBox";
const Step3 = (props) => {
    return ( <div>
                  <table>
            <thead>
              <tr>
                <td>Options</td>
                <td>Basic</td>
                <td className={props.Standard === false ? "none" : "Standard"}>
                  Standard
                </td>
                <td className={props.Premium === false ? "none" : "Premium"}>
                  Premium
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {[...props.TableRowValues].map((el) => (
                <tr>
                  <td>
                    <textarea
                      defaultValue={el.Features}
                      key={el.id}
                      cols="20"
                      rows="2"
                      onChange={props.StoreTableText(el.id)}
                      name="Features"
                    ></textarea>
                  </td>
                  <td>
                    {" "}
                    <p>
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={<ClearIcon style={{ fill: "#ef233c" }} />}
                            checkedIcon={
                              <CheckIcon style={{ fill: "#31cb00" }} />
                            }
                            onChange={props.StoreTableText(el.id)}
                            name="Basic"
                          />
                        }
                      />
                    </p>
                  </td>
                  <td className={props.Standard === false ? "none" : "Standard"}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<ClearIcon style={{ fill: "#ef233c" }} />}
                          checkedIcon={
                            <CheckIcon style={{ fill: "#31cb00" }} />
                          }
                          onChange={props.StoreTableText(el.id)}
                          name="Standard"
                        />
                      }
                    />
                  </td>
                  <td className={props.Premium === false ? "none" : "Premium"}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<ClearIcon style={{ fill: "#ef233c" }} />}
                          checkedIcon={
                            <CheckIcon style={{ fill: "#31cb00" }} />
                          }
                          onChange={props.StoreTableText(el.id)}
                          name="Premium"
                        />
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="DELETEIconBTN"
                      onClick={() => props.removeRowIndex(el.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>Temps de livraison</td>
                <td>
                  <input
                    onChange={(e) => props.setBasicDeliveryTime(e.target.value)}
                    className="DeliveryTime"
                    type="text"
                  />
                  jours
                </td>
                <td className={props.Standard === false ? "none" : "Standard"}>
                  <input
                    onChange={(e) => props.setStandardDeliveryTime(e.target.value)}
                    className="DeliveryTime"
                    type="text"
                  />
                  jours
                </td>
                <td className={props.Premium === false ? "none" : "Premium"}>
                  <input
                    onChange={(e) => props.setPremiumDeliveryTime(e.target.value)}
                    className="DeliveryTime"
                    type="text"
                  />
                  jours
                </td>
                <td></td>
              </tr>

              <tr>
                <td>Prix du pack</td>
                <td>
                  <input
                    onChange={(e) => props.setBasicPrice(e.target.value)}
                    className="DeliveryTime"
                    type="text"
                  />
                  TND
                </td>
                <td className={props.Standard === false ? "none" : "Standard"}>
                  <input
                    onChange={(e) => props.setStandardPrice(e.target.value)}
                    className="DeliveryTime"
                    type="text"
                  />
                  TND
                </td>
                <td className={props.Premium === false ? "none" : "Premium"}>
                  <input
                    onChange={(e) => props.setPremiumPrice(e.target.value)}
                    className="DeliveryTime"
                    type="text"
                  />
                  TND
                </td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button
                    onClick={() =>
                      props.Standard === true ? props.setPremium(true) : props.setStandard(true)
                    }
                    className={
                      props.Standard === true && props.Premium === true ? "none" : "ADDbtn"
                    }
                  >
                    <AddBoxIcon />
                  </button>
                </td>
                <td className={props.Standard === false ? "none" : "Standard"}>
                  <button
                    className={props.Premium ? "none" : "REMOVEbtn"}
                    onClick={() => props.setStandard(false)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
                <td className={props.Premium === false ? "none" : "Premium"}>
                  <button
                    className="REMOVEbtn"
                    onClick={() => props.setPremium(false)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <button
            className="PlaylistAddIconbtn"
            onClick={() => props.addRowToTable()}
          >
            <PlaylistAddIcon
              style={{ fontSize: 50 }}
              className="PlaylistAddIcon"
            />
          </button>
    </div> );
}
 
export default Step3;