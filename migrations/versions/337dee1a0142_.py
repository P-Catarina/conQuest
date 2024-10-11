"""empty message

Revision ID: 337dee1a0142
Revises: 30ab8d04845b
Create Date: 2024-10-11 12:00:37.457994

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '337dee1a0142'
down_revision = '30ab8d04845b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bestiary', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('api', sa.String(length=120), nullable=False))
        batch_op.drop_column('creature_name')
        batch_op.drop_column('api_search')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bestiary', schema=None) as batch_op:
        batch_op.add_column(sa.Column('api_search', sa.VARCHAR(length=120), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('creature_name', sa.VARCHAR(length=120), autoincrement=False, nullable=False))
        batch_op.drop_column('api')
        batch_op.drop_column('name')

    # ### end Alembic commands ###