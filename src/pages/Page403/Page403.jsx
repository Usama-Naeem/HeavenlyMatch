import React from 'react';
import { Link } from 'react-router-dom';
import './page403.css';
import { CANDIDATE_MANAGEMENT } from '../../shared/routes';

function Page404() {
  return (
    <div>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">Access Denied</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">
                    You dont have permission to view this page.
                  </h3>

                  <p>error code:403 forbidden</p>
                  <Link className="link_404" to={CANDIDATE_MANAGEMENT}>
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page404;
